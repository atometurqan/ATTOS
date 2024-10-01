import {BigNumber, ethers} from "ethers";
import {NextRequest, NextResponse} from "next/server";
import abiHome from "../../../abi/TokenHome.json" assert {type: "json"};
import abiRemote from "../../../abi/TokenRemote.json" assert {type: "json"};
import {addTransaction} from "@/components/serverUtils";
import {
    IProduct,
    ITransaction,
    network_type,
    tx_type,
} from "@/components/utils";
import {
    attosProviderWs,
    infureProviderWs,
} from "@/app/rpcProviders/websocketProviders";
import {PrivyClient} from "@privy-io/server-auth";
import NativeEcommerceHomeAbi from "../../../abi/NativeEcommerceHome.json";
import ERC20EcommerceRemoteAbi from "../../../abi/ERC20EcommerceRemote.json";
import {sql} from "@vercel/postgres";

const TokenHome = new ethers.Contract(
    "0x6a9bec39bbAbD6DEF835691deFb44512DE9F2feB",
    abiHome,
    infureProviderWs
);
const TokenRemote = new ethers.Contract(
    "0xf06e68F0992cE0C350C6cE8bCa18aA63f9Fb356f",
    abiRemote,
    attosProviderWs
);
const commerceHomeContract = new ethers.Contract(
  "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c",
  NativeEcommerceHomeAbi,
  attosProviderWs
);
const commerceRemoteContract = new ethers.Contract(
  "0xd44A324Bcc2cD3E35Ab84273864FfFe767c70B4a",
  ERC20EcommerceRemoteAbi,
  infureProviderWs
);

export async function POST(req: NextRequest) {
    const userToken = req.cookies.get("privy-token");

    if (!userToken) {
        req.headers.set("Reason", "Unauthorized");
        return NextResponse.redirect(new URL("/", req.url));
    }

    const privy = new PrivyClient(
        process.env.APP_ID as string,
        process.env.APP_SECRET as string
    );
    const userClaims = await privy.verifyAuthToken(userToken?.value);
    const user = await privy.getUser(userClaims.userId);
    const userName = user?.twitter?.name
        ? user?.twitter?.name
        : user?.customMetadata?.name
            ? user?.customMetadata.name
            : user?.wallet?.address
                .slice(0, 8)
                .concat("....", user?.wallet?.address.slice(-6));
    const body = await req.json();
    if (!body?.userAddress) {
        return new NextResponse("failed", {status: 501});
    }

    const filter = commerceHomeContract.filters.ProductAdded(
        null,
        body.userAddress
    );
    const promise: Promise<[string, string, string, number]> = new Promise((resolve, reject) => {
        attosProviderWs.once(
            {
                topics: filter.topics,
                address: "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c",
            },
            async (e) => {
                const decodedLog = commerceHomeContract.interface.decodeEventLog(
                    commerceHomeContract.interface.getEvent("ProductAdded"),
                    e.data,
                    e.topics
                );

                resolve([
                    decodedLog.sender,
                    ethers.utils.formatUnits(decodedLog.productId, 0),
                    e.transactionHash,
                    e.blockNumber,
                ]);
                setTimeout(() => {
                    reject;
                    attosProviderWs.off({topics: filter.topics});
                }, 20000);
            }
        );
    });
    const [sender, productId, txHash, blockNumber] = await promise;
    var productDetails
    console.log(productId);
    const promise2 = new Promise(async (resolve, reject) => {
        const productDetails = await commerceHomeContract.functions.getProduct(
            productId
        );

        if (productDetails) {
            const Product: IProduct = {
                created_by: sender,
                created_block: blockNumber,
                buyer_chain: "",
                create_origin: productDetails.product.sellerBlockchainId,
                buyer_address: "",
                buy_tx: "",
                description: productDetails.product.title,
                formatted_price: ethers.utils.formatUnits(
                    productDetails.product.price,
                    18
                ) as unknown as number,
                image_url: "",
                is_active: true,
                is_active_reason: "",
                name: userName as string,
                product_id: Number(productId),
                tx_hash: txHash,
            };

            const response = sql`INSERT INTO products (
    tx_hash ,
    created_by ,
    formatted_price ,
    product_id ,
    name ,
    description,
    created_block ,
    is_active,
    buyer_address,
    buy_tx,
    image_url,
    is_active_reason,
    create_origin,
    buyer_chain
    ) VALUES (
        ${Product.tx_hash},
        ${Product.created_by},
        ${Product.formatted_price},
        ${Product.product_id},
        ${Product.name},
        ${Product.description},
        ${Product.created_block},
        ${Product.is_active},
        null,
        null,
        ${Product.image_url},
        ${Product.is_active_reason},
        ${Product.create_origin},
        null
        )
        RETURNING *`;
            await response;
            resolve(Product.product_id);
        }
    });
    return new NextResponse(JSON.stringify({productId: await promise2}));
}


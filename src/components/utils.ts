import {BigNumber, ethers} from "ethers";
import homeAbi from "../abi/TokenHome.json";
import remoteAbi from "../abi/TokenRemote.json";
import NativeEcommerceHomeAbi from "../abi/NativeEcommerceHome.json";
import ERC20EcommerceRemoteAbi from "../abi/ERC20EcommerceRemote.json";
import erc20abi from "../abi/erc20.json";
import {attosExternalProviderSubnet, fujiExternalProvider} from "@/app/rpcProviders/rpcProviders";
import {JsonRpcSigner} from "@ethersproject/providers";


export interface HomeContract {
    homeBlockchainId: string;
    network: string;
    address: string;
    remoteAddress: { destinationBlockchainId: string; remoteContract: string }[];
}

export async function getBalance(
    address: string,
    providerC: any,
    providerSub: any
) {
    if (address) {
        const erc20 = new ethers.Contract(
            "0x5425890298aed601595a70AB815c96711a31Bc65",
            erc20abi,
            providerC
        );
        const c = await erc20.functions.balanceOf(address).catch((err) => {
      

        });

        const a = Number(ethers.utils.formatUnits(c[0]._hex, 6)).toFixed(3);
        var f = await providerSub
            .getBalance(address as string)
            .catch((err: any) => {
                return 0;
            });
        const e = Number(ethers.utils.formatEther(
            f ? (f as BigNumber) : (0 as unknown as bigint)
        )).toFixed(3);
        const n = await fujiExternalProvider.getBalance(address)
        const fn = Number(ethers.utils.formatEther(
            n ? (n as BigNumber) : (0 as unknown as bigint))).toFixed(3)
        return [a, e, fn];
    }
}

export async function waitTX(
    txhash: string,
    provider: ethers.providers.JsonRpcProvider
) {
    const promise = new Promise((resolve, reject) => {
        let tries = 0;
        const a = setInterval(async () => {
            if (tries > 50) {
                reject("timeout");
                clearInterval(a);
            }
            tries++;
            let txReceipt = await provider
                .getTransactionReceipt(txhash)
                .catch((err) => {
                    clearInterval(a);
                    reject(err);
                });

            if (txReceipt?.confirmations && txReceipt.confirmations >= 1) {
                resolve("");
                clearInterval(a);
            }
        }, 2000);
    });
    return promise;
}

export async function buyProductFuji(provier: ethers.providers.JsonRpcSigner, productId: number, amount: string) {
    const erc20 = new ethers.Contract(
        "0x5425890298aed601595a70AB815c96711a31Bc65",
        erc20abi,
        provier
    );

    const commerceRemoteContract = new ethers.Contract(
        "0xd44A324Bcc2cD3E35Ab84273864FfFe767c70B4a",
        ERC20EcommerceRemoteAbi,
        provier
    );
    const tx = await erc20.functions.approve("0xd44A324Bcc2cD3E35Ab84273864FfFe767c70B4a",ethers.utils.parseUnits(amount,6))
    await waitTX(tx.hash,fujiExternalProvider)

    
    const tx2 = await commerceRemoteContract.functions.crossChainBuyProduct(productId,ethers.utils.parseUnits(amount,6))
    await waitTX(tx2.hash,fujiExternalProvider)
    return true
}

export async function buyProductL1(provier: ethers.providers.JsonRpcSigner, productId: number, amount: string) {
    const commerceHomeContract = new ethers.Contract(
        "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c",
        NativeEcommerceHomeAbi,
        provier
    );
    const tx = await commerceHomeContract.functions.buyProduct(productId, {value: ethers.utils.parseEther(amount)})
    await waitTX(tx.hash, attosExternalProviderSubnet)
    return true
}
export async function bridgeTokens(
    type: number,
    fromToken: string,
    amount: number,
    tokenHomeContract: HomeContract,
    provier: ethers.providers.JsonRpcSigner,
    getBalance: any,
    toAddress: string
) {
    if (type == 0) {

        const isNative = tokenHomeContract.network == "Avalanche";
        if (!isNative) {
            throw new Error("function not implemented");
        } else {
            const erc20 = new ethers.Contract(
                "0x5425890298aed601595a70AB815c96711a31Bc65",
                erc20abi,
                provier
            );
            const txx = await erc20.functions.approve(
                tokenHomeContract.address,
                ethers.utils.parseUnits(amount as unknown as string, 6)
            );
            waitTX(txx.hash, fujiExternalProvider).then(async () => {
                const contract = new ethers.Contract(
                    tokenHomeContract.address,
                    homeAbi,
                    provier
                );
                const tx = await contract.functions.send(
                    [
                        tokenHomeContract.remoteAddress[0].destinationBlockchainId,
                        tokenHomeContract.remoteAddress[0].remoteContract,
                        toAddress as string,
                        "0x6a9bec39bbAbD6DEF835691deFb44512DE9F2feB",
                        0,
                        0,
                        250000,
                        "0x0000000000000000000000000000000000000000",
                    ],
                    ethers.utils.parseUnits(amount as unknown as string, 6)
                );

                waitTX(tx.hash, fujiExternalProvider).then(() => {
                    getBalance();
                });
            });
        }
    } else if (type == 1) {
        const remoteContract = new ethers.Contract(
            tokenHomeContract.remoteAddress[0].remoteContract,
            remoteAbi,
            provier
        );
        const a = await remoteContract.functions.send(
            [
                "0x7fc93d85c6d62c5b2ac0b519c87010ea5294012d1e407030d6acd0021cac10d5",
                "0x6a9bec39bbAbD6DEF835691deFb44512DE9F2feB",
                toAddress as string,
                "0x6a9bec39bbAbD6DEF835691deFb44512DE9F2feB",
                0,
                0,
                250000,
                "0x0000000000000000000000000000000000000000",
            ],
            {
                value: ethers.utils.parseEther(amount as unknown as string),
            }
        );
        waitTX(a.hash, attosExternalProviderSubnet)
            .then(() => {
                getBalance();
            })
            .catch((err) => {
              
            });
    }
}

export interface IStripeSession {
    destAddress: string;
    destCurrency: string;
    destAmount: string;
}

export async function getStripeSession(input: IStripeSession) {
    const res = await fetch("/api/onramp/getSession", {
        headers: {
            destAddress: input.destAddress,
            destCurrency: input.destCurrency,
            destAmount: input.destAmount,
        },
    });
    const json = await res.json();
    return json;
}


//#region types

export enum tx_type {
    NATIVE = "NATIVE",
    BRIDGE = "BRIDGE",
    COMMERCE= "COMMERCE"
}

export enum network_type {
    "0x7fc93d85c6d62c5b2ac0b519c87010ea5294012d1e407030d6acd0021cac10d5" = "AVAX",
    "0x3c5c8dae8ee0908f09dd3ff11167251e22d01a0a8849c9ed594c0f46f8204137" = "ATTOS",
}

export interface ITransaction {
    message_id: string;
    from_address: string;
    to_address: string;
    to_chain: string;
    to_bridge: string;
    amount: bigint;
    tx_type: tx_type;
    tx_hash: string;
    block_number: number;
    from_chain: string;
}

export interface IAccount {
    id: string;
    created_at: Date;
    linked_accounts: string;
    wallet: string;
    google: string;
    mfa_methods: string;
    has_accepted_terms: boolean;
    is_guest: boolean;
}

export interface IProduct {
    tx_hash: string;
    created_by: string;
    formatted_price: number;
    product_id: number;
    name: string;
    description: string | null;
    created_block: number;
    is_active: boolean;
    buyer_address: string | null;
    buy_tx: string | null;
    image_url: string | null;
    is_active_reason: string | null;
    create_origin: string | null;
    buyer_chain: string | null;
}

export interface IProductComments {
    id: number;
    product_id: number;
    user_id: string;
    rating: number;
    created_date: Date;
    comment: string | null;
}

export interface IRequestResponse {
    data: any[],
    total: number | null,
    error: string[] | null
}

//#endregion

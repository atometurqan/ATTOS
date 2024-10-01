"use client"
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import usdcLogo from "@/public/9000.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NativeEcommerceHomeAbi from "../abi/NativeEcommerceHome.json";
import ERC20EcommerceRemoteAbi from "../abi/ERC20EcommerceRemote.json";
import { useConnectWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import DropDown from "./dropdown";
import { useEffect, useState } from "react";
import FundsDropDown from "./fundsDropdown";
import { ethers } from "ethers";
import { attosExternalProviderSubnet, fujiExternalProvider } from "@/app/rpcProviders/rpcProviders";

export default function AddProductCard() {
    const commerceHomeContractGlob = new ethers.Contract(
        "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c",
        NativeEcommerceHomeAbi,
        attosExternalProviderSubnet
    );
    const { ready: readyy, wallets } = useWallets();
    const [provier, setProvider] = useState<ethers.providers.JsonRpcSigner>();
    const router = useRouter()
    const [productId, setProductId] = useState()
    const { user, ready, sendTransaction } = usePrivy()
    const [network, setNetwork] = useState("Avalanche")
    const [title, settitle] = useState("")
    const [price, setPrice] = useState("")
    const connect = useConnectWallet({
        onSuccess: getWallet,
    });
    function handleChangeTitle(e: any) {
        settitle(e.target.value)
        console.log(title);

    }
    function handleChangePrice(e: any) {
        setPrice(e.target.value)
        console.log(price);

    }


    async function addProduct() {
        if (network == "Avalanche") {
            const commerceRemoteContract = new ethers.Contract(
                "0xd44A324Bcc2cD3E35Ab84273864FfFe767c70B4a",
                ERC20EcommerceRemoteAbi,
                provier
            );

            const products: any[] = await commerceHomeContractGlob.functions.getSellerToProducts(provier?.getAddress())
            var lastId;
            if (products) {
                if (products.length == 0) {
                    lastId = null
                }
                else {
                    lastId = products[products.length - 1]
                }
            }
            console.log(lastId);

            fetch("/api/service", {
                method: "POST",
                headers: { type: "Crosschain Add Product" },
                body: JSON.stringify({ userAddress: user?.wallet?.address, lastId: lastId })
            }).then(async (r) => {
                setTimeout(async () => {
                    const res = await r.json();
                    setProductId(res.productId)

                }, 1000)

            })

            const tx = await commerceRemoteContract.functions.crossChainAddProduct(ethers.utils.parseEther(price), title);
            setTimeout(()=> {
                router.push("/products")
            },3500)

        }
        else if (network == "ATTOS") {

            const commerceHomeContract = new ethers.Contract(
                "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c",
                NativeEcommerceHomeAbi,
                provier
            );
            const products: any[] = await commerceHomeContractGlob.functions.getSellerToProducts(provier?.getAddress())
            var lastId;
            if (products) {
                if (products.length == 0) {
                    lastId = null
                }
                else {
                    lastId = products[products.length - 1]
                }
            }
            console.log(lastId);

            fetch("/api/service", {
                method: "POST",
                headers: { type: "Crosschain Add Product" },
                body: JSON.stringify({ userAddress: user?.wallet?.address, lastId: lastId })
            }).then(async (r) => {
                setTimeout(async () => {
                    const res = await r.json();
                    setProductId(res.productId)
                    console.log(res);
                }, 1000)

            })
            await commerceHomeContract.functions.addProduct([ethers.utils.parseEther(price), title]);
            setTimeout(()=> {
                router.push("/products")
            },3500)

        }
        else {
            console.log("please first select network ");

        }
    }
    async function getWallet() {
        const chainId =
            network == "Avalanche" ? 43113 : network == "ATTOS" ? 1304 : 43113;
        const walletClientType = user?.wallet?.address;
        console.log(user?.wallet);
        let found = false;
        wallets.forEach(async (e) => {
            if (e.address == walletClientType) {
                found = true;
                await e.switchChain(chainId);
                const provider = await e.getEthersProvider();
                const signer = provider.getSigner();
                setProvider(signer);

                return;
            }
        });

        if (
            !found &&
            ready &&
            user?.wallet?.connectorType == "injected" &&
            readyy
        ) {
            connect.connectWallet({ suggestedAddress: user?.wallet?.address });
        }
    }
    useEffect(() => {
        if (ready) {
            getWallet();
        }
    }, [network])
    useEffect(() => {
        if (ready && readyy) {
            getWallet();
        }
    }, [ready, readyy])
    useEffect(() => {
        if (productId) {
            router.push("/products")
        }
    }, [productId])
    return (


        <div
            className=" h-[34rem]  relative    w-80 flex flex-col  mb-4 ml-2 bg-white border border-gray-200 rounded-lg shadow ">
            <div >
                <Image className="w-full rounded-md rounded-b-xl scale-[1.01]   h-64  mx-auto" alt=""
                    width="9000" height="1000" src={usdcLogo}
                />
            </div>

            <div className="h-24 w-full  text-black p-3">
                <p className="text-base text-ellipsis h-24 overflow-hidden tracking-normal w-full font-bold">{user?.twitter?.name ? user?.twitter?.name : user?.customMetadata?.name ? user?.customMetadata.name : user?.wallet?.address.slice(0, 8).concat("....", user?.wallet?.address.slice(-6))} <span className="text-neutral-700 text-sm font-semibold"><input onChange={handleChangeTitle} className="w-full h-8 border border-solid border-slate-950 rounded p-2" placeholder="Product title"></input></span></p>
            </div>

            <div className="px-2"> <div className="text-base text-slate-950   font-bold font-sans h-20 justify-around  flex bg-slate-50 w-full p-2 rounded-lg border border-solid tracking-normal border-[#3333] items-center "><div><input className="w-16 rounded p-2 border-solid border text-sm border-slate-950 h-7" onChange={handleChangePrice}></input> $USDC</div><div className="w-36"><FundsDropDown className="  " setState={setNetwork} state={network}></FundsDropDown></div></div></div>
            <div className="absolute bottom-4  flex justify-center w-[100%] "> <button onClick={async () => {
                addProduct()

            }} className="bg-[#009000]  active:scale-95 transition-all duration-75 hover:bg-[#2a912a] py-[.32rem] rounded w-[92%]">Add product</button></div>
        </div>

    )
}
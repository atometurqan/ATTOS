"use client"
import Image from "next/image";
import avaxLogo from "@/public/avax.svg";
import usdcLogo from "@/public/usdc.svg";
import { FcLike } from "react-icons/fc";
import ProductCard from "@/components/productCard";
import { getProducts } from "@/components/serverUtils";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useConnectWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import ChainDropDown from "@/components/chainDropdown";
import clsx from "clsx";
import Link from "next/link";


export default function Page({ searchParams }: { searchParams: any }) {


 
    const [products, setProducts] = useState([])
    const [network, setNetwork] = useState("Avalanche")
    const { ready: readyy, wallets } = useWallets();
    const [provier, setProvider] = useState<ethers.providers.JsonRpcSigner>();
    const [page, setPage] = useState(0);
  
    const { user, ready, sendTransaction } = usePrivy()
    const connect = useConnectWallet({
        onSuccess: getWallet,
    });
    async function getWallet() {
        const chainId =
            network == "Avalanche" ? 43113 : network == "ATTOS" ? 1304 : 43113;
        const walletClientType = user?.wallet?.address;

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
    async function getProduct() {


        if (searchParams?.seller != undefined) {
            const products = await fetch("/api/products/getProductsBySeller", { method: "GET", headers: { page: page as unknown as string, creator: searchParams.seller } })
            if (products.status == 200) {
                const productsArray = await products.json()
                setProducts(productsArray.body.data)
            }

        }
        else {
            const products = await fetch("/api/products/getProducts", { method: "GET", headers: { page: page as unknown as string } })
            if (products.status == 200) {
                const productsArray = await products.json()
                setProducts(productsArray.body.data)

            }
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

        getProduct()

    }, [page])
    return (
        <div className="h-full overflow-hidden flex flex-col p-4">
            <div className="">
                <div className="p-4 w-[100%] bg-zinc-950 relative flex flex-row justify-center rounded-md">
                    <div className="flex w-[100%] flex-row items-center justify-around p-2">
                        <div className="flex w-24 ">


                        </div>
                        <div className="flex h-full mx-auto  rounded"><ChainDropDown state={network} setState={setNetwork} /></div>
                        <div className=" w-24 ">
                            <Link href="/products/addProduct" className="text-sm p-2 rounded bg-green-950">Add Product</Link>
           
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full  pt-4">
                <div className="p-2 h-full pb-24  overflow-y-auto  w-[100%] bg-neutral-800 flex flex-col  rounded-md">
                    <div className="w-full flex-wrap pb-20  relative  items-center lg:items-start lg:justify-center flex flex-col grid-rows-4 lg:flex-row">
                        {products?.map((e, i) => {
                            return <ProductCard chain={network}  provider={provier}  key={i} product={e}></ProductCard>
                        })
                        }
                        <button onClick={() => { setPage(page + 1) }} className={clsx("w-48 absolute bottom-10 h-10 bg-white text-black rounded-full", {
                            "hidden" : products.length == 0,
                            "block" : products.length !=0
                        })}>Load More</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
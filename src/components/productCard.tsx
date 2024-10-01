"use client"
import Image from "next/image";

import usdcLogo from "@/public/9000.png";

import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { buyProductFuji, buyProductL1, IProduct } from "./utils";
import { ethers } from "ethers";
import {
    attosProviderWs,
    
  } from "@/app/rpcProviders/websocketProviders";
import NativeEcommerceHomeAbi from "../abi/NativeEcommerceHome.json";

import { useState } from "react";

interface IProductCard {
    product: IProduct, chain: string, provider?: ethers.providers.JsonRpcSigner
}
export default function ProductCard(input: IProductCard) {
    const commerceHomeContract = new ethers.Contract(
        "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c",
        NativeEcommerceHomeAbi,
        attosProviderWs
    );

    const router = useRouter()
    const { user } = usePrivy()
    const [sold, setSold] = useState(false);
    async function handleBuy() {
 
        const filter = commerceHomeContract.filters.ProductsBuy(
            input.product.product_id as number,
            null,
            null,
            null,
            null
          );
          commerceHomeContract.once({topics: filter.topics,address: "0x5dF1BD87885eA83D39F5Eb02384e2058eb726C0c"},(e)=>{
            setSold(true)
     
            
          })
        if (input.chain == "Avalanche") {
            const status = await  buyProductFuji(input.provider as ethers.providers.JsonRpcSigner, input.product.product_id, input.product.formatted_price as unknown as string)
      
        } 
        else if (input.chain == "ATTOS") {
            const status = await buyProductL1(input.provider as ethers.providers.JsonRpcSigner, input.product.product_id, input.product.formatted_price as unknown as string)
        
        }
   
    }
    return (

        <div
            className=" h-[34rem] cursor-pointer hover:brightness-105  relative  w-72 lg:mx-auto flex flex-col  mb-12 ml-2 bg-white  rounded-lg shadow ">
            <div >
                <Image className="w-full rounded-md scale-[1.01] rounded-b-xl   h-64  mx-auto" alt=""
                    width="9000" height="1000" src={usdcLogo}
                />
            </div>

            <div className="h-32 w-full  text-black p-3">
                <p onClick={() => {
                    navigator.clipboard.writeText(input.product.created_by)
                }} className="text-base hover:text-red-500 text-ellipsis h-12 overflow-hidden tracking-normal w-full font-bold">{input.product.name} <span className="text-neutral-700 text-sm font-semibold">{input.product.description}</span></p>
            </div>

            
            <div className="px-2"> <p className="text-base text-slate-950   font-bold font-sans h-10 justify-around  flex bg-slate-50 w-full p-2 rounded-lg border border-solid tracking-normal border-[#3333] items-center "><span>{input.product.formatted_price} $USDC</span><span className="text-[#009000]"> {input.product.create_origin == "0x7fc93d85c6d62c5b2ac0b519c87010ea5294012d1e407030d6acd0021cac10d5" ? "Avalanche" : "ATTOS"} </span></p></div>
            <div className="absolute z-20 bottom-16  flex justify-center w-[100%] "><div className="bg-[#00020017]  active:scale-95 transition-all duration-75 hover:bg-[#2a912a] py-[.32rem] text-black font-bold rounded w-[92%] text-center" >Product id :{input.product.product_id}</div></div>
       

            
            <div className="absolute z-20 bottom-4  flex justify-center w-[100%] ">{input.product.created_by == user?.wallet?.address ? <div className="bg-[#0090008a]  active:scale-95 transition-all duration-75 hover:bg-[#2a912a] py-[.32rem] rounded w-[92%] text-center" >Your product</div> : <button onClick={async () => {
                handleBuy()

            }} className="bg-[#009000]  active:scale-95 transition-all duration-75 hover:bg-[#2a912a] py-[.32rem] rounded w-[92%]">{sold ? "Sold" : "Buy Now"}</button>}</div>
        </div>
    )
}
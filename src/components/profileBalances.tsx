"use client"
import {useEffect, useState} from "react";
import {getBalance} from "./utils";
import {ethers} from "ethers";
import {usePrivy} from "@privy-io/react-auth";
import {attosExternalProviderSubnet, fujiExternalProvider} from "@/app/rpcProviders/rpcProviders";

export default function ProfileBalance({address}: { address: string }) {
    const {ready} = usePrivy()
    const [balances, setBalances] = useState(["", ""])

    useEffect(() => {
        if (ready) {
            const getBalances = async () => {
                const get = await getBalance(address, fujiExternalProvider, attosExternalProviderSubnet)
                setBalances(get as string[])
            }
            getBalances()
        }
    }, [ready])

    return (

        <div className="h-24 w-full text-xs  rounded border border-solid border-[#555] flex ">
            <div
                className="w-1/2 p-1 md:p-2 flex flex-col text-center  items-center justify-around rounded-r-lg bg-[#555]">
                <p>Fuji C Chain</p>
                <p>AVAX : {balances ? balances[2] : 0} $AVAX</p>
                <p>USDC : {balances ? balances[0] : 0} $USDC</p>
            </div>
            <div className="w-1/2 p-1 md:p-2 text-center flex flex-col items-center justify-around ">
                <p>ATTOS A Chain</p>
                <p>USDC : {balances ? balances[1] : 0} $USDC</p>

            </div>
        </div>
    )
}
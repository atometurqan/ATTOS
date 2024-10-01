"use client"

import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import avax from "../public/avax.svg"
import usdc from "../public/usdc.svg"
import Logo from '../public/Logo.svg'
interface IDropDown {
    state: any,
    setState: any,
    networkState?: any,
}
export default function DropDown(props: IDropDown) {
    const [open, setOpen] = useState(false)

    function handleClick() {
        if (open) {
            setOpen(false)
        }
        else {
            setOpen(true)
        }
    }

    return (
        <div onClick={() => { handleClick() }} className={clsx("w-full cursor-pointer  border border-solid flex items-center  border-[#333] rounded relative h-12", props.state != "" && "justify-start", props.state == "" && "justify-center")}>
            {
                props.state == "" ? "Select Token" : props.state == "AVAX" ? <div className="flex px-2 itemx-center gap-2 w-full"><Image className="h-6 w-6" alt="avax" src={avax}></Image><p className="flex items-center">AVAX</p></div> : props.state == "USDC" ? <div className="flex px-2 itemx-center gap-2 w-full"><Image className="h-6 w-6" alt="usdc" src={usdc}></Image><p className="flex items-center">USDC</p></div> : ""

            }
            <div className={clsx("  top-12 -left-[1px]  absolute flex flex-col z-20  transition-all w-[calc(100%+2px)]   bg-zinc-950 rounded duration-75 ",
                !open && "invisible opacity-0",
                open && "translate-y-1 opacity-100  visible"
            )}>
                <button onClick={() => {
                    props.setState("USDC")
                }} className={clsx("text-center m-1 p-4 h-10 rounded flex items-center hover:bg-[#555]  gap-4 ", props.state == "USDC" && "bg-[#555]")}><Image className="h-6 w-6" alt="usdc" src={usdc}></Image>USDC</button>
                {props.networkState == "Avalanche" ? <button onClick={() => {
                    props.setState("AVAX")
                }} className={clsx("text-center m-1 p-4 h-10 rounded flex items-center hover:bg-[#555]  gap-4 ", props.state == "AVAX" && "bg-[#555]")}><Image className="h-6 w-6" alt="AVAX" src={avax}></Image>AVAX</button> : ""}
            </div>


        </div>
    )
}
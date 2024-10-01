"use client"

import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import avax from "../public/avax.svg"
import usdc from "../public/Logo.svg"


interface IDropDown {
    state: any,
    setState: any,
    className?: string,
}

export default function ChainDropDown(props: IDropDown) {
    const [open, setOpen] = useState(false)

    function handleClick() {
        if (open) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }


    return (
        <div onClick={() => {
            handleClick()
        }}
            className={clsx("w-20 cursor-pointer p-2  flex items-center justify-center bg-[#222] rounded relative h-20")}>
            {
                props.state == "" ? "Select Token" : props.state == "Avalanche" ?
                    <div className="flex items-center p-1 "><Image className="h-12 w-12" alt="avax"
                        src={avax}></Image></div> : props.state == "ATTOS" ?
                        <div className="flex  items-center p-2  "><Image className="h-12 w-12" alt="usdc"
                            src={usdc}></Image></div> : ""

            }
            <div
                className={clsx("  top-24 -left-[1px]  absolute flex flex-col z-20  transition-all w-[calc(100%+2px)]   bg-zinc-950 rounded duration-75 ",
                    !open && "invisible opacity-0",
                    open && "translate-y-1 opacity-100  visible"
                )}>
                <button onClick={() => {
                    props.setState("ATTOS")
                }}
                    className={clsx("text-center text-white m-1 p-3 h-16 rounded flex items-center hover:bg-[#555]   ", props.state == "ATTOS" && "bg-[#555]")}>
                    <Image className="h-16 w-16" alt="usdc" src={usdc}></Image>
                </button>
                <button onClick={() => {
                    props.setState("Avalanche")
                }}
                    className={clsx("text-center m-1 p-3 text-white h-16 rounded flex items-center hover:bg-[#555]   ", props.state == "Avalanche" && "bg-[#555]")}>
                    <Image className="h-16 w-16" alt="usdc" src={avax}></Image>
                </button>
            </div>


        </div>
    )
}
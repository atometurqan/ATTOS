"use client"

import clsx from "clsx"
import Image from "next/image"
import { useEffect, useState } from "react"
import avax from "../public/avax.svg"
import usdc from "../public/Logo.svg"

interface IDropDown {
    state: any,
    setState: any,
    className: string,
}

export default function FundsDropDown(props: IDropDown) {
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
            className={clsx("w-full cursor-pointer  border border-solid flex items-center  border-[#333] rounded relative h-12", props.state != "" && "justify-start", props.state == "" && "justify-center").concat(" ", props.className)}>
            {
                props.state == "" ? "Select Token" : props.state == "Avalanche" ?
                    <div className="flex px-2 itemx-center gap-2 w-full"><Image className="h-6 w-6" alt="avax"
                        src={avax}></Image><p
                            className="flex items-center">Avalanche</p></div> : props.state == "ATTOS" ?
                        <div className="flex px-2 itemx-center gap-2 w-full"><Image className="h-6 w-6" alt="usdc"
                            src={usdc}></Image><p
                                className="flex items-center">ATTOS</p></div> : ""

            }
            <div
                className={clsx("  top-12 -left-[1px]  absolute flex flex-col z-20  transition-all w-[calc(100%+2px)]   bg-zinc-950 rounded duration-75 ",
                    !open && "invisible opacity-0",
                    open && "translate-y-1 opacity-100  visible"
                )}>
                <button onClick={() => {
                    props.setState("ATTOS")
                }}
                    className={clsx("text-center text-white m-1 p-4 h-10 rounded flex items-center hover:bg-[#555]  gap-4 ", props.state == "ATTOS" && "bg-[#555]")}>
                    <Image className="h-6 w-6" alt="usdc" src={usdc}></Image>ATTOS
                </button>
                <button onClick={() => {
                    props.setState("Avalanche")
                }}
                    className={clsx("text-center m-1 p-4 text-white h-10 rounded flex items-center hover:bg-[#555]  gap-4 ", props.state == "Avalanche" && "bg-[#555]")}>
                    <Image className="h-6 w-6" alt="usdc" src={avax}></Image>Avalanche
                </button>
            </div>


        </div>
    )
}
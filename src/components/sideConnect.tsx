"use client"
import { usePrivy } from "@privy-io/react-auth"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

interface ISideButton {
    highlight?: boolean,
    classname?: string,
    icon?: React.ReactNode,
    children?: any,

}
export default function SideWalletButton(props: ISideButton) {
    const { login, logout, authenticated} = usePrivy()
    async function logoutt() {
         logout().then(()=> {
            window.location.replace("/")
         })
    }
    return (

        <div className={clsx("lg:w-44 w-9 h-10 md:my-4 text-sm font-thin hover:bg-[#222] bg-zinc-950 rounded flex items-center justify-center   border border-solid".concat(" ", props.classname as string), {
            "border-[#8fff3328]": authenticated,
            "border-none": !authenticated
        })}>
            <button onClick={authenticated ? logoutt : login} className="w-full flex gap-4 items-center pl-2 tracking-wider text-center  text-pretty  h-full " >
                <div className="text-xl text- ">{props.icon}</div>
                <p className=" invisible lg:visible">{props.children}</p>
            </button>
        </div>

    )
}
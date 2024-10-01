"use client"
import { usePrivy } from "@privy-io/react-auth"
import clsx from "clsx"
import { RiLoginBoxLine } from "react-icons/ri"

interface IButton {
    children?: React.ReactNode,
    className?: string
}
export default function PrivyButton (props :IButton) {
    const {authenticated , login, logout, user} = usePrivy()
    return (
       <div className={clsx("h-20  flex-wrap md:flex p-4 hidden  items-center justify-center  border-t w-full  border-solid border-[#333]", {
        "lg:justify-center" : !authenticated,
        "lg:justify-between" : authenticated
       })}>
        <div className={clsx("text-sm flex items-center gap-2", {
            "hidden" : !authenticated,
            "block" : authenticated
        })}>{authenticated ? user?.wallet?.address.slice(0,6).concat("..", user.wallet.address.slice(-5, -1).toUpperCase()) : ""}<div className="w-[6px] h-[6px] rounded-full bg-green-400 "></div></div>
         <button onClick={authenticated ? logout : login} className={clsx("border p-2   text-sm  border-solid border-[#333]".concat(" ", props.className as string), {
            "border-[#009000] rounded" :authenticated,
            "rounded-full py-2 px-4" : !authenticated
        })}>
            {authenticated ? <div className="text-[1.3rem]"><RiLoginBoxLine /></div> : <p className="text-sm">Log in<span className="text-sm tracking-tighter"> with <span className="text-green-300 text-xs tracking-normal">Privy</span></span></p>}
        </button>
       </div>
    )
}
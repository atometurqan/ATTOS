"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ISideButton {
    highlight?: boolean,
    classname?: string,
    href: string,
    icon?: React.ReactNode,
    children?: any,
}
export default function SideButton(props: ISideButton) {
    const pathname = usePathname()
    const isActive = pathname.startsWith(`${props.href}`)
    return (

        <div className={"lg:w-48 w-9 h-10 md:my-4 text-sm font-thin hover:bg-[#222] bg-zinc-950 rounded flex items-center justify-center".concat(" ", props.classname as string, isActive ? " border-[#90FF33] border border-solid" : "")}>
            <Link className="w-full flex gap-4 items-center pl-2 tracking-wider text-center  text-pretty  h-full " href={props.href}>
                <div className="text-xl text- ">{props.icon}</div>
                <p className=" invisible lg:visible">{props.children}</p>
            </Link>
        </div>

    )
}
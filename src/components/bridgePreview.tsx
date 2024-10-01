import clsx from "clsx";
import {useEffect} from "react";
import {AiOutlineArrowDown} from "react-icons/ai";

interface IBridgePreview {
    fromNetwork: string;
    toNetwork?: string;
    fromToken: string;
    toToken: string;
    fromState: boolean;
    toState: boolean;
    useraddress: string;
    onClick: any;
    amount: number;
}

export default function BridePreview(props: IBridgePreview) {


    return (
        <div
            className="mt-4 h-[calc(100%-7rem)] flex flex-col justify-between p-4  rounded-lg border bg-zinc-950 w-full">
            <div
                className={clsx("w-full h-28 bg-[#444] transition-all opacity-0 duration-100 px-2 py-3 flex flex-col gap-2 -translate-x-14  rounded-md", {
                    "translate-x-0 opacity-100": props.fromState && props.amount != 0
                })}>
                <p className="w-full text-center h-2 text-xs mb-1">{props.fromNetwork} Network</p>
                <div className="flex-1 bg-[#222] p-2 flex items-center  rounded">
                    <div className="flex w-full justify-between items-center text-xs"><p>Balance Change : </p><p
                        className="text-red-400">-{props.amount?.toString()} {props.fromToken} on
                        ({props.fromNetwork})</p></div>

                </div>
            </div>
            <AiOutlineArrowDown className={clsx("absolute top-[calc(50%+0.7rem)] opacity-0 left-[calc(50%-0.5rem)]", {
                "opacity-100": props.fromState && props.amount != 0
            })}></AiOutlineArrowDown>
            <div
                className={clsx("w-full h-28 bg-[#333] transition-all opacity-0 duration-100 -translate-x-14  px-2 py-3 flex flex-col gap-2  rounded-md", {
                    "translate-x-0 opacity-100": props.fromState && props.amount != 0
                })}>
                <p className="w-full text-center h-2 text-xs mb-1">{props.fromNetwork == "Avalanche" ? "ATTOS" : props.fromNetwork == "ATTOS" ? "Avalanche" : ""} Network</p>
                <div className="flex-1 bg-[#222] p-2 flex gap-1 flex-col justify-center  rounded">
                    <div className="flex w-full justify-between items-center text-xs"><p>Balance Change : </p><p
                        className="text-green-400">+{props.amount} {props.fromToken} on
                        ({props.fromNetwork == "Avalanche" ? "ATTOS" : props.fromNetwork == "ATTOS" ? "Avalanche" : ""})</p>
                    </div>
                    <div className="flex w-full justify-between items-center text-xs"><p>Address : </p><p
                        className="text-balance text-[0.6rem]">{props.useraddress}
                    </p></div>
                </div>
            </div>
            <button onClick={props.onClick}
                    className={clsx("w-full h-8 flex items-center opacity-0 justify-center active:bg-[#903333] active:scale-95 transition-all duration-100 text-black text-sm text-pretty  bg-slate-100 rounded-full", {
                        "opacity-100": props.fromState && props.amount != 0
                    })}>Send
            </button>

        </div>
    )
}
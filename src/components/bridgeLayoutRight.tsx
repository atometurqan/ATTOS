"use client"
import clsx from "clsx";
import DropDown from "./dropdown";
import "../app/globals.css"
import {ChangeEvent} from "react";
import {BridgeFund, FundButton} from "./addFundButton";

interface IBridgeSide {
    state: any;
    setState: any;
    fromTokenState: any;
    setFromTokenState: any;
    amount: number;
    setAmount: any;

}

export default function BridgeLeftSide(props: IBridgeSide) {


    function handleAmount(event: ChangeEvent<HTMLInputElement>): void {
        props.setAmount(event.target.value)


    }

    return (
        <div
            className="md:h-[500px] p-4  md:w-40 text-xs flex flex-col justify-stretch w-[370px]  lg:w-52 border border-solid md:rounded-r-none rounded-md md:border-b md:border-r-0 rounded-l-lg border-[#333]">

            <p>From Network :</p>
            <div className=" flex-1 flex gap-4 items-center w-full h-full pt-4 flex-col">
                <div className="w-full border  flex border-solid relative border-[#555] h-8 rounded-full ">
                    <button className={clsx("w-1/2", props.state == "Avalanche" && "text-[#36f0f0]")}
                            onClick={() => props?.setState("Avalanche")}>AVAX
                    </button>
                    <button className={clsx("w-1/2", props.state == "ATTOS" && "text-[#36f0f0]")}
                            onClick={() => props?.setState("ATTOS")}>ATTOS
                    </button>
                    <div
                        className={clsx("w-[calc(50%+0.25rem)] transition-all duration-75   h-full bg-[#ffffff2c] absolute rounded-full", props.state == "ATTOS" && "translate-x-[calc(100%-0.5rem)]")}></div>
                </div>

                <p>Token </p>
                <DropDown state={props.fromTokenState} setState={props.setFromTokenState}/>
                <p>Amount</p>
                <div className=" flex h-9  w-[calc(100%-0.8px)]  divside rounded relative bg-[#333]  justify-end ">
                    <input value={props.amount} onChange={handleAmount}
                           className=" focus:outline-1 focus:outline-double  focus:outline-green-300 w-full    pr-9 bg-transparent absolute  h-full rounded p-2  "/>
                    <div className=" w-8 h-full justify-end p-2 absolute flex items-center  z-0 text-xs ">
                        <button className="absolute z-20">max</button>
                    </div>
                </div>
                <BridgeFund className="w-full mt-2 py-1"/>
                <div className=" justify-around hidden md:flex  mt-auto flex-col  text-center    w-full ">


                </div>
            </div>
        </div>
    )
}
"use client"
import clsx from "clsx";
import DropDown from "./dropdown";
import "../app/globals.css"
import {ChangeEvent, useEffect, useState} from "react";

interface IBridgeSide {
    state: any;
    setState: any;
    fromTokenState: any;
    setFromTokenState: any;
    userAddress: string | undefined;
    setUserAddress: any;
    amount: number;
    setAmount: any;
}

export default function BridgeRightSide(props: IBridgeSide) {

    function handleAmount(event: ChangeEvent<HTMLInputElement>): void {
        props.setAmount(event.target.value)


    }


    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        props.setUserAddress(event.target.value)


    }

    return (
        <div
            className="md:h-[500px]  lg:w-52 p-4  text-xs flex flex-col justify-stretch w-[370px] md:w-40 border border-solid rounded-md md:rounded-l-none md:border-t  md:border-l-0 md:rounded-r-lg border-[#333]">

            <p>To Network :</p>
            <div className=" flex-1 flex gap-4 h-full pt-4 items-center flex-col">
                <div className="w-full border  flex border-solid relative border-[#555] h-8 rounded-full ">
                    <button className={clsx("w-1/2", props.state == "ATTOS" && "text-[#36f0f0]")}
                            onClick={() => props?.setState("ATTOS")}>AVAX
                    </button>
                    <button className={clsx("w-1/2", props.state == "Avalanche" && "text-[#36f0f0]")}
                            onClick={() => props?.setState("Avalanche")}>ATTOS
                    </button>
                    <div
                        className={clsx("w-[calc(50%+0.25rem)] transition-all duration-75   h-full bg-[#ffffff2c] absolute rounded-full", props.state == "Avalanche" && "translate-x-[calc(100%-0.5rem)]")}></div>
                </div>
                <p>Token </p>
                <DropDown state={props.fromTokenState} setState={props.setFromTokenState}/>
                <p>To Address </p>
                <div className=" flex h-9 w-[calc(100%-2px)]  justify-center rounded ">
                    <input value={props.userAddress} onChange={handleChange}
                           className=" w-full text-[0.6rem] h-full rounded p-2 focus:outline-1 bg-[#333] focus:outline-double  focus:outline-green-300  "/>

                </div>
                <p>Amount </p>
                <div className=" flex h-9 w-[calc(100%-2px)]  justify-center rounded  ">
                    <input value={props.amount} onChange={handleAmount}
                           className=" w-full  h-full rounded p-2 focus:outline-1 bg-[#333]  focus:outline-double  focus:outline-green-300  "/>

                </div>
                <div className=" justify-around hidden mt-auto md:flex  flex-col  text-center    w-full ">





                </div>
            </div>
        </div>
    )
}
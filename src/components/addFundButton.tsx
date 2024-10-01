"use client"

import {usePrivy} from "@privy-io/react-auth";
import {getStripeSession} from "./utils"
import {useState} from "react";
import FundModal from "./addFundModal";

export function FundButton({className}: { className?: string }) {
    const [opened, setOpened] = useState(false)
    const {ready, user} = usePrivy();

    return (
        <div className={"w-1/2 px-5 md:px-2 flex justify-center".concat(" ", className as string)}>
            {opened && <FundModal setState={setOpened} toNetwork="Avalanche"></FundModal>}
            <button onClick={() => {
                setOpened(true)
            }
            }
                    className="md:w-44 w-32 md:h-11 h-9 text-xs md:text-base bg-[#903333] hover:bg-[#90344f] active:scale-95 rounded-full">Add
                funds to Fuji
            </button>
        </div>

    )
}

export function FundToAttos() {
    const [opened, setOpened] = useState(false)
    const {ready, user} = usePrivy();

    return (
        <div className={"w-1/2 px-5 md:px-2 flex justify-center"}>
            {opened && <FundModal setState={setOpened} toNetwork="Avalanche"></FundModal>}
            <button onClick={() => {
                setOpened(true)
            }
            }
                    className="md:w-44 w-32 md:h-11 h-9 text-xs md:text-base bg-[#009000] hover:bg-[#00933F] active:scale-95 rounded-full">Add
                funds to Attos
            </button>
        </div>

    )
}

export function BridgeFund({className}: { className?: string }) {
    const [opened, setOpened] = useState(false)
    const {ready, user} = usePrivy();

    return (
        <div className={"w-full  flex justify-center".concat(" ", className as string)}>
            {opened && <FundModal setState={setOpened} toNetwork="Avalanche"></FundModal>}
            <button onClick={() => {
                setOpened(true)
            }
            }
                    className="w-full py-4 md:h-8 h-6 text-sm md:text-sm transition-all flex items-center justify-center font-semibold duration-100 hover:text-[#fffbfb] bg-[#333333be]  text-[#4379FF] hover:bg-[#5433ff]  active:scale-95 rounded-lg">
                <span className="text-white mr-1">Add funds with {" "} </span> Stripe
            </button>
        </div>

    )
}
"use client"

import {useEffect, useState} from "react"
import FundsDropDown from "./fundsDropdown"
import DropDown from "./dropdown"
import clsx from "clsx"
import {CryptoElements, OnrampElement} from "./stripeCryptoElement"
import {loadStripeOnramp} from "@stripe/crypto"
import React from "react"
import {usePrivy, User} from "@privy-io/react-auth"
import {request} from "http"
import {useRouter} from "next/navigation"


interface IFundModal {
    setState: any,
    toNetwork?: string,


}

export default function FundModal(input: IFundModal) {
    const router = useRouter()
    const {user} = usePrivy()
    const stripeOnrampPromise = loadStripeOnramp("pk_test_51PziWjP4F0cuCA7LVgu2mjIu8XSHz4VUUZY7dlIR3WkRLdUhusPvncWTruYQcgogiPBDfA5QmGQDSXQ00WJz7TVR00nV3swlaw");
    const [clientSecret, setClientSecret] = useState("");
    const [toNetwork, setToNetwork] = useState("")
    const [toToken, setToToken] = useState("")
    const [amount, setAmount] = useState("")
    const [ready, setReady] = useState(false)
    const [strready, setStrReady] = useState(false)
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false)

    function handleChange(e: any) {
        setAmount(e.target.value)
    }

    useEffect(() => {
        setReady(true)
    }, [])
    const onChange = React.useCallback(({session}: { session: any }) => {
        setMessage(session?.status);
    }, []);

    async function load() {
        fetch("/api/onramp/getSession", {
            method: "GET",
            headers: {
                destAddress: user?.wallet?.address as string,
                destCurrency: toToken.toLowerCase(),
                destAmount: amount as string,
                email: user?.customMetadata?.email ? user?.customMetadata.email : ""
            },
            cache: "no-cache"
        }).then(async (r) => {
            const secret = await r.json()
            setClientSecret(secret.client_secret)
            setReady(true)
            console.log(secret);

            setStrReady(true)
        })

    }

    useEffect(() => {
        if (message.includes("fulfillment_complete")) {
            setSuccess(true)
        }
        console.log(message);


    }, [message])
    useEffect(() => {
        if (success) {
            console.log(success);
            if (toNetwork == "ATTOS") {
                router.push("/bridge?payment=success")
            }
        }

    }, [success])

    return (
        <div>
            {strready ?
                <div
                    className={clsx("fixed flex items-center justify-center p-4 bottom-0 left-0 w-full opacity-0 transition-all duration-300 h-full backdrop-blur-sm bg-black z-20 bg-opacity-45", {
                        "opacity-100": ready
                    })}>
                    <CryptoElements stripeOnramp={stripeOnrampPromise}>
                        {clientSecret && (
                            <OnrampElement
                                id="onramp-element"
                                clientSecret={clientSecret}
                                onReady={() => setStrReady(true)}
                                appearance={{theme: "dark"}}
                                onChange={onChange}
                            />
                        )}
                    </CryptoElements>
                    <button onClick={() => {
                        input.setState(false)
                    }} className="fixed right-3 top-3">X
                    </button>
                </div>
                :
                <div
                    className={clsx("fixed text-base  flex items-center justify-center p-4 bottom-0 left-0 w-full opacity-0 transition-all duration-300 h-full backdrop-blur-sm bg-black z-20 bg-opacity-45", {
                        "opacity-100": ready
                    })}>
                    <button onClick={() => {
                        input.setState(false)
                    }} className="w-full  h-full absolute top-0 z-30"></button>
                    <button onClick={() => {
                        input.setState(false)
                    }}
                            className="absolute right-5 top-5 w-5 h-5 rounded-full text-center flex items-center justify-center ">x
                    </button>
                    <div
                        className="w-96 h-[30rem] border absolute top-auto left-auto flex flex-col z-50 justify-between p-8 border-solid bg-black  border-fuchsia-400 rounded-lg">
                        <p className="w-80 text-center">Add funds with <span className="text-fuchsia-400">Stripe</span>
                        </p>
                        <div className="w-80">
                            <p className="pb-3">Select Network</p>
                            <FundsDropDown className="" state={toNetwork} setState={setToNetwork}/>
                        </div>
                        <div className="w-80">
                            <p className="pb-3">Select token</p>
                            <DropDown state={toToken} networkState={toNetwork} setState={setToToken}/>
                        </div>
                        <div className="w-80">
                            <p className="pb-3">Amount</p>
                            <input value={amount} onChange={handleChange}
                                   className="h-10 w-full text-[1rem] rounded p-2  focus:outline-1 bg-[#333] focus:outline-double  focus:outline-green-300  "/>
                        </div>
                        <p className="text-sm font-thin h-3 mb-1 text-center">{toNetwork == "ATTOS" ? "You will direct to bridge after payment succesful" : " "}</p>
                        <button onClick={() => {
                            load()
                        }}
                                className="w-full bg-white rounded-full py-1 active:scale-95 transition-all duration-75 text-black font-bold">Go
                            stripe
                        </button>
                    </div>


                </div>}
        </div>
    )
}
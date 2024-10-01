"use client"
import { User } from "@privy-io/react-auth";
import clsx from "clsx";
import { getClientBuildManifest } from "next/dist/client/route-loader";
import { useEffect, useState } from "react";

export default function Update({ user }: { user: User }) {
    const [userNameinput, setUserNameInput] = useState("")
    const [emailinput, setEmailInput] = useState("")
    const [dateinput, setdateInput] = useState("")
    const [ready, setReady] = useState(false)
    function onChangeUserName (e:any) {
        setUserNameInput(e.target.value)
    }
    function onChangeMail (e:any) {
        setEmailInput(e.target.value)
    }
    function onChangeDate (e:any) {
        setdateInput(e.target.value)
    }
    useEffect(() => {
    

    }, [ready])

    async function sendUpdates() {
        const res = await fetch("/api/accounts/updatePrivy", {
            method: "POST",
            headers: {
                name: userNameinput,
                email : emailinput,
                dob: dateinput,
            }
        })
      
        
    }

    return (
        <div>
            <button onClick={() => { setReady(true) }} className="w-24 h-10 flex items-center justify-center text-sm bg-[#555] rounded-lg">Update info</button>

            <div className={clsx("fixed  flex items-center justify-center p-4 bottom-0 left-0 w-full opacity-0 transition-all duration-300 h-full backdrop-blur-sm bg-black  bg-opacity-45", {
                "invisible opacity-0": !ready,
                "opacity-100 visible z-20": ready

            })}>
                <div className="w-96 h-96 p-4 flex flex-col items-center justify-around  py-8 bg-neutral-950 rounded-xl">
                    <div className="flex justify-around"><span className="w-24 text-sm flex items-center py-2 h-8">Name:</span> <input onChange={onChangeUserName} pattern={"^[a-zA-Z0-9]{3,16}$"} className={clsx(" text-sm border border-solid  invalid:border-red-300 border-[#333] w-48 h-8 p-2 rounded bg-black", {
                        "valid:border-[#009000]": userNameinput != ""
                    })} placeholder="username"></input></div>
                    <div className="flex justify-around"><span className="w-24 text-sm flex items-center py-2 h-8">Email:</span> <input onChange={onChangeMail}  pattern={"^[a-zA-Z0-9.]+@[a-zA-Z]+.[a-zA-Z]{2,}$"} className={clsx(" text-sm border border-solid  invalid:border-red-300 border-[#333] w-48 h-8 p-2 rounded bg-black", {
                        "valid:border-[#009000]": emailinput != ""
                    })} placeholder="emal"></input></div>
                    <div className="flex justify-around"><span className="w-24 text-sm flex items-center py-2 h-8">Date of birth:</span> <input onChange={onChangeDate} value={dateinput} pattern="" type="date" className={clsx(" text-sm border border-solid  invalid:border-red-300 border-[#333] w-48 h-8 p-2 rounded bg-black", {
                        "valid:border-[#009000]": dateinput != ""
                    })} placeholder="date of birth"></input></div>
                    <button onClick={()=> {sendUpdates()}} className="p-4 w-24 rounded bg-[#009000]">Send</button>

                </div>
                <button onClick={() => { setReady(false) }} className="fixed z-100 right-3 top-3 p-2 px-3 rounded bg-slate-400">x</button>
            </div>

        </div>
    )
}

















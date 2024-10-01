"use client"
export default function TxHash({txhash}: {txhash :string}) {
    return<div className="cursor-pointer text-lime-500"
    onClick={()=> {navigator.clipboard.writeText(txhash as string)}} >{`${txhash.slice(0, 8)}...${txhash.slice(-6)}`}</div>
}

import {AiFillCaretDown} from "react-icons/ai";
import {ITransaction} from "./utils";
import {ethers} from "ethers";
import Link from "next/link";
import TxHash from "./txHash";

export default function TElement({tx, userAddress}: { tx: ITransaction, userAddress:string }) {
    return (
        <tr>
            <td className="w-full h-16 text-xs py-2 items-center border-b border-solid flex justify-between md:justify-between">
                <div className="w-24 h-12 flex flex-col justify-center"><TxHash txhash={tx.tx_hash} ></TxHash>
                    <p className="bg-[#333] mt-1 py-[0.2rem] w-auto text-center rounded">{tx.tx_type == "NATIVE" ? "Native Transfer" : tx.tx_type == "BRIDGE" ?  "Bridge": tx.tx_type == "COMMERCE" && tx.to_address == userAddress?.toLowerCase() ? "Sold Product" : tx.from_address == userAddress?.toLowerCase()? "Buy Product" : "Product Buy" }</p>
                </div>
                <div className="md:w-48 min-w-32 h-12 flex flex-col justify-center items-center text-xs">
                    <div>{`${tx.from_address.slice(0, 6)}...${tx.from_address.slice(-6)}`}</div>
                    <AiFillCaretDown className="w-full box-content flex items-center justify-center h-4 my-[0.1rem]"
                                     fill="white"></AiFillCaretDown><p
                    className=" ">{`${tx.to_address.slice(0, 6)}...${tx.to_address.slice(-6)}`}</p></div>
                <div
                    className="w-16 h-6  bg-slate-800  p-1 text-xs text-[#FFF] font-semibold rounded flex flex-col items-center justify-center">{ethers.utils.formatEther(BigInt(tx.amount)).slice(0, 3)} USDC
                </div>
            </td>
        </tr>
    )
}
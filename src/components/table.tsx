"use server"
import {getTransactionsByTxType, getTransactionByWallet} from "./serverUtils";
import TElement from "./tableElements";

export default async function CustomTable({header, className, color, address, txType}: {
    header: string,
    className: string,
    color?: string,
    address?: string,
    txType: string,
}) {
    var txs: any[];
    txs = address ? await getTransactionByWallet(address as string) : await getTransactionsByTxType(txType);
    return (
        <div className={className}>
            <div className={"h-full w-full  [#5c1111]   rounded-xl ".concat(" ", color as string)}>
                <div className="w-full sticky py-2 pt-1 px-2 h-10 border-b border-solid my-1 mt-0 ">{header}</div>
                <div className="h-[calc(100%-4rem)] px-2 overflow-auto w-[calc(100%)] ">
                    <table className="w-full mt-2   overflow-auto ">
                        <thead className="w-full border-b border-solid border-[#555] py-2 ">
                        <tr className="w-full h-8 overflow-hidden text-center flex  justify-between ">
                            <th className="w-24 text-start">Tx Hash</th>
                            <th className="w-48 text-center">From / To</th>
                            <th className="w-16 ">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {txs.map((e, i) => {
                            return <TElement userAddress={address as string} tx={e} key={i}></TElement>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
import CustomTable from "@/components/table";
import {tx_type} from "@/components/utils";

export default function Page() {
    return (
        <div
            className="h-full w-full overflow-auto p-2 md:p-8 my-10 md:my-0  flex flex-col justify-evenly items-center">
            <div className="w-48 rounded text-center p-2 mb-8 md:mb-0 bg-[#333]"><h3>ALL PAYMENTS</h3></div>
            <div className="flex gap-8 flex-wrap md:p-4 justify-center w-full">
                <CustomTable className="w-[500px]  h-[500px]" color="bg-zinc-950" header="Payments"
                             txType={tx_type.COMMERCE}/>
                <CustomTable className="w-[500px] h-[500px]" color="bg-zinc-950" header="Bridges"
                             txType={tx_type.BRIDGE}/>
            </div>
        </div>
    )
}
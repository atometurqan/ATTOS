  //@ts-nocheck
"use server";
import { FundButton, FundToAttos } from "@/components/addFundButton";
import ProfileBalance from "@/components/profileBalances";
import { getUser } from "@/components/serverUtils";
import CustomTable from "@/components/table";
import Update from "@/components/uptadeUser";
import { getBalance } from "@/components/utils";
import { User } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from 'next/headers'

async function validation(auth: RequestCookie) {
    if (!auth) {
        return
    }
    const user = await getUser(auth as RequestCookie)
    return user

}

export default async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const cookieStore = cookies()
    const auth = cookieStore.get("privy-token");
    const user = await validation(auth as RequestCookie)
    return (
        <div className="w-full min-h-full py-12 px-2 xl:px-8 flex flex-col  md:flex-nowrap items-center justify-center">
            <div className="w-32 rounded text-center p-2 mb-8 md:mb-0 bg-[#333]"><h3>Profile</h3></div>
            <div className="flex min-h-[40rem] w-full gap-5 md:p-8 p-1 flex-col xl:flex-row md:flex-nowrap   rounded">
                <div className="md:w-full xl:w-[60%]  w-full rounded p-4 flex flex-col   bg-black ">
                    <div className="md:h-48 h-52   w-full">
                        <p className="w-full text-2xl">Personal Information</p>
                        <div className="flex  py-4 w-full h-24 md:h-20 justify-around   gap-6 md:gap-24">
                            <div className="md:w-32 lg:w-36 w-24">
                                <p className="h-8 text-sm">Username</p>
                                <div
                                    className=" bg-[#fff2] flex items-center justify-center h-8 text-sm rounded">{user?.customMetadata?.username ? user?.customMetadata?.name : user?.linkedAccounts[0]?.username ? user?.linkedAccounts[0]?.name : ""}</div>
                            </div>
                            <div className="md:w-32 lg:w-36 w-24">
                                <p className="h-8 text-sm ">Name</p>

                                <div
                                    className=" bg-[#fff2] flex items-center justify-center h-8 text-sm rounded">{user?.linkedAccounts[0]?.name}</div>
                            </div>
                            <div className="md:w-32 lg:w-36 w-24">
                                <p className="h-8 text-sm">Mail</p>
                                <div
                                    className=" bg-[#fff2] flex items-center justify-center h-8 text-xs rounded">{user?.customMetadata?.email ? user?.customMetadata?.email : user?.linkedAccounts[0].email ? user?.linkedAccounts[0].email : ""}</div>
                            </div>
                        </div>
                        <div className="flex  py-4 w-full  h-32 md:h-20 justify-around gap-6 md:gap-24">
                            <div className="md:w-32 lg:w-36 w-24">
                                <p className="h-8 text-sm">Login Method</p>
                                <div
                                    className=" bg-[#fff2] flex items-center justify-center h-8 text-sm rounded">{user?.twitter ? "Twitter" : user?.google ? "Google" : user?.wallet?.walletClientType?.toLocaleUpperCase("en")}</div>
                            </div>
                            <div className="md:w-32 lg:w-36 w-24">
                                <p className="h-8 text-sm">Wallet Address</p>
                                <div
                                    className=" bg-[#fff2] flex items-center justify-center h-8 text-xs rounded">{user?.wallet?.address ? user.wallet.address.slice(0, 6).concat("...", user.wallet.address.slice(-6)) : ""}</div>
                            </div>
                            <div className="md:w-32 lg:w-36 w-24">
                                <p className="h-8 text-sm">Date of birth</p>
                                <div className=" bg-[#fff2] flex items-center justify-center h-8 text-sm rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-24 pt-8 flex justify-end gap-6">
                        <Update user={user as User}></Update>
                    </div>
                    <div
                        className="flex-1 flex-col w-full rounded-lg gap-8 justify-center  md:px-8 py-8 flex items-center">
                        <ProfileBalance address={user?.wallet?.address as string} />
                        <div className="w-full flex ">
                            <FundButton />
                            <FundToAttos />
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-[40%] h-full    rounded    min-h-[40rem]">
                    <CustomTable address={user?.wallet?.address as string} color="bg-black"
                        className="h-[40rem] w-full p-0" header="Your Payments" />
                </div>
            </div>
        </div>
    );
}

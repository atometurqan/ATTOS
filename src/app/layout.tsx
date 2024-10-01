import type { Metadata } from "next";
import "./globals.css";
import SideButton from "@/components/sideButtons";
import { CgProfile } from "react-icons/cg";
import { TbBuildingBridge2 } from "react-icons/tb";
import { VscArrowSwap } from "react-icons/vsc";
import { MdPayments } from "react-icons/md";
import { SiHiveBlockchain } from "react-icons/si";
import { MdOutlineShoppingBasket } from "react-icons/md";
import { LuWallet } from "react-icons/lu";
import SideWalletButton from "@/components/sideConnect";
import Providers from "@/components/providers";
import PrivyButton from "@/components/privyButton";
import Link from "next/link";
import Head from "next/head";
import Logo from '../public/Logo.svg'
import Image from "next/image";

export const metadata: Metadata = {
    title: "ATTOS",
    description: "Cross chain ecommerce home",
};

export default function RootLayout({
    children,

}: {
    children: React.ReactNode;

}) {


    return (
        <html lang="en" className={`max-h-full min-h-[100vh] max-w-full w-full `}>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                    rel="stylesheet" />
                <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"></link>
                <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"></link>
                <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"></link>
                <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"></link>
                <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"></link>
                <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"></link>
                <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"></link>
                <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"></link>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"></link>
                <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png"></link>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"></link>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
                <link rel="manifest" href="/manifest.json"></link>
                <meta name="msapplication-TileColor" content="#ffffff"></meta>
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
                <meta name="theme-color" content="#ffffff"></meta>
            </Head>
            <body
                className={`font-roboto h-full min-h-[100vh] w-full antialiased`}

            >
                <Providers>
                    <div className="h-[100vh] min-h-[100vh] md:flex w-full">

                        <div
                            className="lg:w-64 w-full h-12 flex items-center justify-center md:block fixed bottom-4 md:bottom-auto z-40   md:w-24 md:border-r md:h-full md:top-0 md:relative   border-solid border-[#333]">
                            <div
                                className="flex md:block h-14 rounded-xl items-center justify-center md:bg-transparent bg-zinc-950">
                                <Link href="/"
                                    className="md:w-full h-12  md:h-36 flex items-center justify-center text-center text-3xl md:text-5xl py-0 md:py-4 p-4">
                                    <Image className="md:w-24 md:h-24 h-9 w-9 text-white " alt="Logo" src={Logo}></Image>
                                </Link>
                                <div
                                    className="py-0 md:py-4 p-4 flex flex-row justify-center gap-4 md:gap-0 md:flex-col items-center">
                                    <SideButton classname="  " icon={<MdOutlineShoppingBasket></MdOutlineShoppingBasket>} href="/products">E-COMMERCE APP</SideButton>
                                    <SideButton classname="" icon={<TbBuildingBridge2></TbBuildingBridge2>} href="/bridge">Bridge
                                        Tokens</SideButton>
                                    <SideButton classname="  " icon={<VscArrowSwap></VscArrowSwap>} href="/transactions">All
                                        Payments</SideButton>

                                    <SideButton classname="  " icon={<CgProfile></CgProfile>}
                                        href="/profile">Profile</SideButton>
                                    <SideWalletButton classname="md:hidden block"
                                        icon={<LuWallet></LuWallet>}>Connect</SideWalletButton>
                                </div>
                                <div className="absolute hidden md:block bottom-0 left-0 w-full">
                                    <div
                                        className="lg:h-24 py-2 flex flex-col items-center text-center text-xs  justify-center border-t w-full border-solid border-[#333]">
                                        <p className="text-[0.5rem] md:text-xs">ATTOS Network : <span
                                            className="text-[#009000]">ONLINE</span></p>
                                        <p className="text-[0.5rem] md:text-xs">AVAX Network : <span
                                            className="text-[#009000]">ONLINE</span></p>

                                    </div>


                                    <PrivyButton />

                                </div>
                            </div>
                        </div>
                        <div className="md:flex-1 min-h-full overflow-y-auto">{children}</div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}

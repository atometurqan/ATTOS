import Image from "next/image";
import usdcLogo from "@/public/usdc.svg";
import Link from "next/link";
import React from "react";

export default function Home() {
    return (
        <div className="h-full flex flex-col p-4">
            <div className="pt-4 bg-zinc-800 text-white rounded-md">
                <main className="container mx-auto p-6 pb-10">

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Creating Account</h2>
                        <p className="mb-4">You can select form options like Email ,Google and even Twitter or you could
                            just use your own wallet</p>
                        <ol className="list-decimal ml-5">
                            <li>On the bottom left corner you will see login with privy</li>
                            <li>After clicking that click the option you want to use this app with</li>
                            <li>Congratulations you are ready to use ATTOS teleporter</li>
                        </ol>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Features</h2>
                        <p className="mb-4">This application includes the following features:</p>
                        <ul className="list-disc ml-5">
                            <li>Sending cross chain payments with usdc</li>
                            <li>Putting items to sale</li>
                            <li>Buying items from another users</li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">How to bridge</h2>
                        <p className="mb-4">To send a interchain token transer</p>
                        <ul className="list-disc ml-5">
                            <li>First head over to <Link className="text-blue-400" href="/bridge">Bridge</Link> page
                            </li>
                            <li>If you have funds you can fill the amount and address inputs to send tokens
                                immediately
                            </li>
                            <li>Or you can add funds directly into your wallet with stripe. To do that :</li>
                            <ul className="list-decimal ml-8">
                                <li>Click on the add funds with <span className="text-fuchsia-400">Stripe</span> button
                                </li>
                                <li>Select Network (Currently, direct fund additions to ATTOS are not supported.)</li>
                                <li>Select the token you wish to fund</li>
                                <li>Write the amount</li>
                                <li>Click the 'Go Stripe' button and finalize your transaction.</li>
                            </ul>
                            <li>You can also add funds on your <Link className="text-blue-400"
                                                                     href="/profile">profile</Link> with same steps
                            </li>
                            <li>For better and faster user experience fill the necessary inputs on <Link
                                className="text-blue-400" href="/profile">profile</Link></li>

                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Payments</h2>
                        <p className="mb-4">To see all payments happening on blockchain head over to the <Link
                            className="text-blue-400" href="/transactions">All Payments</Link> page</p>
                        <ul className="list-disc ml-5">
                            <li>Native token transfers are displayed on the left side.</li>
                            <li>Cross-chain transactions are shown on the right.</li>
                            <li>And If you'd like to see your own transactions you can look them up on your own <Link
                                className="text-blue-400" href="/profile">Profile</Link> page
                            </li>
                        </ul>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">Marketplace</h2>
                        <p className="mb-4">On the <Link
                            className="text-blue-400" href="/products">Market</Link> page, you can list your items for
                            sale and purchase from other users.</p>
                        <ul className="list-disc ml-5">
                            <li>you’ll find a randomly curated list of all available items.</li>
                            <li>Click on any item to view its details.</li>
                        </ul>
                    </section>

                    {/*<section>*/}
                    {/*    <h2 className="text-2xl font-semibold mb-2">Support</h2>*/}
                    {/*    <p className="mb-4">If you encounter any issues, please reach out to our support team:</p>*/}
                    {/*    <p>Email: <a href="mailto:support@example.com"*/}
                    {/*                 className="text-blue-600">support@example.com</a></p>*/}
                    {/*</section>*/}
                </main>
            </div>
        </div>
    )
        ;
}

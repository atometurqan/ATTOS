"use client";

import BridgeRightSide from "@/components/bridgeLayout";
import BridgeLeftSide from "@/components/bridgeLayoutRight";
import {useEffect, useState} from "react";
import {CgArrowRight} from "react-icons/cg";
import {AiOutlineArrowDown} from "react-icons/ai";
import BridePreview from "@/components/bridgePreview";
import {
    ConnectedWallet,
    useConnectWallet,
    usePrivy,
    useWallets,
} from "@privy-io/react-auth";
import {BigNumber, BigNumberish, ethers} from "ethers";
import erc20abi from "../../abi/erc20.json";
import {bridgeTokens, HomeContract} from "@/components/utils";

import {attosExternalProviderSubnet, fujiExternalProvider} from "@/app/rpcProviders/rpcProviders";

interface sendFunction {
    fromNetwork: string;
    fromToken: string;
    amount: number;
}

export default function Page() {

    const [fromNetwork, setFromNetwork] = useState("Avalanche");
    const [fromToken, setFromToken] = useState("");
    const [value, setValue] = useState(0);
    const [balances, setBalances] = useState(["", ""]);
    const [fromstate, setFromState] = useState(false);
    const [toState, settoState] = useState(false);
    const [toAddress, setToAddress] = useState("");
    const {ready, user} = usePrivy();
    const [provier, setProvider] = useState<ethers.providers.JsonRpcSigner>();
    const {ready: readyy, wallets} = useWallets();
    const connect = useConnectWallet({
        onSuccess: getWallet,
    });
    const TokenContracts = {
        USDC: {
            homeBlockchainId:
                "0x7fc93d85c6d62c5b2ac0b519c87010ea5294012d1e407030d6acd0021cac10d5",
            network: "Avalanche",
            address: "0x6a9bec39bbAbD6DEF835691deFb44512DE9F2feB",
            remoteAddress: [
                {
                    destinationBlockchainId:
                        "0x3c5c8dae8ee0908f09dd3ff11167251e22d01a0a8849c9ed594c0f46f8204137",
                    remoteContract: "0xf06e68F0992cE0C350C6cE8bCa18aA63f9Fb356f",
                },
            ],
        },
    };
    useEffect(() => {
        getWallet();
        getBalance()
        if (fromToken != "") {
            setFromState(true);
        }


    }, [fromNetwork, fromToken, user]);

    async function getBalance() {
        if (user?.wallet?.address) {
            const erc20 = new ethers.Contract(
                "0x5425890298aed601595a70AB815c96711a31Bc65",
                erc20abi,
                fujiExternalProvider
            );
            const c = await erc20.functions
                .balanceOf(user?.wallet?.address)
                .catch((err) => {
                    console.log(err);
                });

            const a = ethers.utils.formatUnits(c[0]._hex, 6);
            var f = await attosExternalProviderSubnet
                .getBalance(user?.wallet?.address as string)
                .catch((err) => {
                    return 0
                });
            const e = ethers.utils.formatEther(
                f ? (f as BigNumber) : (0 as unknown as bigint)
            );
            setBalances([a.slice(0, 6), e.slice(0, 6)]);
        }
    }

    async function getWallet() {
        const chainId =
            fromNetwork == "Avalanche" ? 43113 : fromNetwork == "ATTOS" ? 1304 : 43113;
        const walletClientType = user?.wallet?.address;
        console.log(user?.wallet);
        let found = false;
        wallets.forEach(async (e) => {
            if (e.address == walletClientType) {
                found = true;
                await e.switchChain(chainId);
                const provider = await e.getEthersProvider();
                const signer = provider.getSigner();
                setProvider(signer);
                setToAddress(walletClientType) 
                return;
            }
        });

        if (
            !found &&
            ready &&
            user?.wallet?.connectorType == "injected" &&
            readyy
        ) {
            connect.connectWallet({suggestedAddress: user?.wallet?.address});
        }
    }

    useEffect(() => {
        if (ready) {
            setToAddress(user?.wallet?.address as string);
            getWallet();
            getBalance();
        }
    }, [ready, readyy]);

    async function sendTokens(input: sendFunction) {
        const contract = fromToken == "AVAX" ? null : TokenContracts.USDC;
        if (input.fromNetwork == "Avalanche") {
            bridgeTokens(
                0,
                input.fromToken,
                input.amount,
                contract as HomeContract,
                provier as ethers.providers.JsonRpcSigner,
                getBalance,
                toAddress
            );
            return;
        } else if (input.fromNetwork == "ATTOS") {
            await getWallet().then(() => {
                bridgeTokens(
                    1,
                    input.fromToken,
                    input.amount,
                    contract as HomeContract,
                    provier as ethers.providers.JsonRpcSigner,
                    getBalance,
                    toAddress
                );
            });

            return;
        }
    }

    return (
        <div className="h-full flex flex-col items-center justify-center w-full">
            <div className="h-12 rounded-full mb-2 p-2 text-2xl flex items-center">
                Bridge your tokens
            </div>
            <div className=" flex gap-8 md:gap-0  flex-col md:flex-row items-center">
                <BridgeLeftSide
                    setFromTokenState={setFromToken}
                    setAmount={setValue}
                    amount={value}
                    fromTokenState={fromToken}
                    state={fromNetwork}
                    setState={setFromNetwork}
                />

                <div className=" lg:w-96 w-[370px] justify-center md:w-[350px] flex items-center relative h-full">
                    <div
                        className="w-full h-[500px] p-4   relative border  rounded-md md:rounded-none  border-solid  border-[#333]  ">
                        <div
                            className="w-full flex items- justify-between p-2 text-xs text-slate-50 bg-zinc-950 rounded-lg h-24">
                            <div className="flex flex-col text-center justify-around">
                                <p>Token : {fromToken}</p>

                                <p>
                                    Network :{" "}
                                    <span className="text-[#009000]">{fromNetwork}</span>
                                </p>

                                <p>
                                    Balance : <span>{balances ? balances[0] : 0} $USDC</span>
                                </p>
                            </div>
                            <div className="h-full flex items-center">
                                <CgArrowRight className="text-xl"/>
                            </div>
                            <div className="text-center flex flex-col justify-around">
                                <p>Token : {fromToken}</p>
                                <p>
                                    Network :{" "}
                                    <span className="text-[#009000]">
                    {fromNetwork == "Avalanche"
                        ? "ATTOS"
                        : fromNetwork == "ATTOS"
                            ? "Avalanche"
                            : ""}
                  </span>
                                </p>
                                <p>
                                    Balance : <span>{balances ? balances[1] : 0} $USDC</span>
                                </p>
                            </div>
                        </div>
                        <BridePreview
                            amount={value}
                            onClick={() =>
                                sendTokens({
                                    fromNetwork: fromNetwork,
                                    amount: value,
                                    fromToken: fromToken,
                                })
                            }
                            useraddress={toAddress}
                            fromState={fromstate}
                            toState={toState}
                            fromNetwork={fromNetwork}
                            toToken={fromToken}
                            fromToken={fromToken}
                        />
                    </div>
                </div>
                <BridgeRightSide
                    userAddress={toAddress}
                    setAmount={setValue}
                    amount={value}
                    setUserAddress={setToAddress}
                    setFromTokenState={setFromToken}
                    fromTokenState={fromToken}
                    state={fromNetwork}
                    setState={setFromNetwork}
                />
            </div>
        </div>
    );
}

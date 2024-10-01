'use client';

import {PrivyProvider} from '@privy-io/react-auth';
import {defineChain} from 'viem';
import {avalancheFuji} from 'viem/chains';

export const myCustomChain = defineChain({
    id: 1304, // Replace this with your chain's ID
    name: 'ATTOS',
    network: 'ATTOS',
    nativeCurrency: {
        decimals: 18, // Replace this with the number of decimals for your chain's native token
        name: 'USDC',
        symbol: 'USDC',
    },
    rpcUrls: {
        default: {
            http: ['https://attos.fun/ATTOS/rpc'],

        },
    },

});
export const Fuji = defineChain({
    id: 43113, // Replace this with your chain's ID
    name: 'Fuji C Chain',
    network: 'Fuji',
    nativeCurrency: {
        decimals: 18, // Replace this with the number of decimals for your chain's native token
        name: 'AVAX',
        symbol: 'AVAX',
    },
    rpcUrls: {
        default: {
            http: ['https://attos.fun/C/rpc'],

        },
    },

});

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId="cm1pr68mg065akioszv7pckt0"
            config={{

                defaultChain: avalancheFuji,
                supportedChains: [avalancheFuji, myCustomChain],
                // Customize Privy's appearance in your app
                appearance: {
                    theme: 'dark',
                    landingHeader: 'Welcome to ATTOS APP',
                    accentColor: '#009000',
                    logo: 'https://pbs.twimg.com/profile_images/1581228063022538752/hBov9qnF_400x400.jpg',
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {

                    priceDisplay: {
                        primary: "native-token",
                        secondary: null,
                    },
                    waitForTransactionConfirmation: true,
                    createOnLogin: 'users-without-wallets',
                },
            }}
        >
            {children}
        </PrivyProvider>
    );
}

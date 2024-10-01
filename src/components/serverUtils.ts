import {JsonRpcSigner} from "@ethersproject/providers";

'server-only';
import {ITransaction, network_type, IProduct, IRequestResponse, tx_type} from "@/components/utils";
import {sql} from "@vercel/postgres";
import {AuthTokenClaims, PrivyClient} from "@privy-io/server-auth";
import {RequestCookie} from 'next/dist/compiled/@edge-runtime/cookies';
import {unstable_noStore as noStore} from 'next/cache';

import {fujiExternalProvider} from "@/app/rpcProviders/rpcProviders";
import {ethers, Signer} from "ethers";

interface IUpdate {
    name: string,
    value: string,
}

export async function updateUser(userClaims: AuthTokenClaims, inputs: IUpdate[]) {
    const privy = new PrivyClient(process.env.APP_ID as string, process.env.APP_SECRET as string);
    inputs?.forEach(async (e: any) => {
        const res = await privy.setCustomMetadata(userClaims.userId, e)
        return res
    })
    return null
}

export async function getUser(userToken: RequestCookie) {
    noStore();
    const privy = new PrivyClient(process.env.APP_ID as string, process.env.APP_SECRET as string);
    const userClaims = await privy.verifyAuthToken(userToken.value);
    const user = await privy.getUser(userClaims.userId)


    return user;
}

export async function addTransaction(transaction: ITransaction): Promise<boolean> {
    const res = await sql.sql`INSERT INTO transactions (
    tx_hash,from_address,from_chain,
    to_address,to_chain,amount,
    block_number,tx_type,message_id,to_bridge
    ) VALUES 
    (
        ${transaction.tx_hash.toLowerCase()},
        ${transaction.from_address.toLowerCase()},
        ${transaction.from_chain},
        ${transaction.to_address.toLowerCase()},
        ${network_type[transaction.to_chain as keyof typeof network_type]},
        ${transaction.amount as any},
        ${transaction.block_number},
        ${transaction.tx_type},
        ${transaction.message_id},
        ${transaction.to_bridge}
    )`
    return res.rowCount! > 0
}

export async function getTransaction(txHash: string): Promise<ITransaction | null> {
    const res = await sql.sql`SELECT * FROM transactions WHERE tx_hash=${txHash.toLowerCase()}`
    return res.rows[0] as ITransaction
}

export async function getTransactionsByTxType(txType: string): Promise<ITransaction[]> {
    noStore();
    const res = await sql.sql`SELECT * FROM transactions where tx_type=${txType} order by block_number desc Limit 20`
    return res.rows as ITransaction[]
}

export async function getTransactionByWallet(walletAddress: string): Promise<ITransaction[]> {
    noStore();
    const res = await sql`SELECT * FROM transactions WHERE from_address = ${walletAddress.toLowerCase()} or to_address=${walletAddress.toLowerCase()} order by timestamp desc Limit 20`;
    return res.rows as ITransaction[]
}

export function getMyBalance(address: string) {
    //rpc isteği 
    return null
}
export async function getProducts() {
    noStore();
    const res = await sql`SELECT * FROM products order by product_id desc Limit 20`;
    return  res.rows as IProduct[];
}


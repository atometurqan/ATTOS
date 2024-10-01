import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function GET(request: NextRequest) {
    const txHash = request.nextUrl.searchParams.get("txHash");
    const res = await sql`SELECT * FROM transactions WHERE tx_hash = ${txHash} Limit 1`;
    if (res.rows.length === 0) {
        return NextResponse.json({body: {error: "Transaction not found"}}, {status: 404});
    }
    return NextResponse.json({body: {tx: res.rows[0]}}, {status: 200});
}
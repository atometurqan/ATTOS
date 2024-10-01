import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {ITransaction} from "@/components/utils";

export async function GET(request: NextRequest) {
    const wallet = request.nextUrl.searchParams.get("wallet");
    const res = await sql`SELECT * FROM transactions WHERE from_address = ${wallet} or to_address=${wallet} Limit 10`;
    return NextResponse.json({body: {tx: res.rows as ITransaction[]}}, {status: 200});
}
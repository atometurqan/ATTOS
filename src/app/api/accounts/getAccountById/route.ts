import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IAccount, IRequestResponse} from "@/components/utils";

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("user_id");
    const res = await sql`SELECT * FROM accounts WHERE user_id = ${userId} Limit 1`;
    if (res.rows.length === 0) {
        return NextResponse.json({
            body: {
                data: [],
                total: null,
                error: ["Account not found"]
            } as IRequestResponse
        }, {status: 404});
    }
    return NextResponse.json({body: {data: res.rows[0] as IAccount, error: []}}, {status: 200});
}
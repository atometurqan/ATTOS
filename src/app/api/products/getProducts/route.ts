import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IProduct, IRequestResponse} from "@/components/utils";

export async function GET(request: NextRequest) {
    var page = request.headers.get("page") as unknown as number
    if (!page) {
        page = 0
    }
    ;
    const res = await sql`SELECT * FROM products where is_active=true order by product_id desc Limit ${20+ page*20}`;
    const total = await sql`SELECT count(*) FROM products where is_active=true`;
    return NextResponse.json({
        body: {
            data: res.rows as IProduct[],
            total: total.rows[0].count,
            error: []
        } as IRequestResponse
    }, {status: 200});
}
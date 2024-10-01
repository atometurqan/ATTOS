import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IProduct, IRequestResponse} from "@/components/utils";

export async function GET(request: NextRequest) {
    var page = request.headers.get("page") as unknown as number
    var creator = request.headers.get("creator") as unknown as string
    if (!page) {
        page = 0
    }
    ;
    if (!creator) {
        creator = ""
    }
    ;
    const res = await sql`SELECT * FROM products  products where created_by=${creator} order by product_id desc Limit ${3+ page*3}`;
    return NextResponse.json({
        body: {
            data: res.rows as IProduct[],
            total: null,
            error: []
        } as IRequestResponse
    }, {status: 200});
}
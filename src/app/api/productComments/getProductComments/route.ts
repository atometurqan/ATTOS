import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IProductComments, IRequestResponse} from "@/components/utils";

export async function GET(request: NextRequest) {
    const productId = await request.nextUrl.searchParams.get("productId");
    if (!productId) {
        return NextResponse.json({
            body: {
                data: [], total: null,
                error: ["Product id not provided"]
            } as IRequestResponse
        }, {status: 400});
    }
    const res = await sql`Select * from productcomments where product_id = ${productId} order by created_at desc`;
    return NextResponse.json({
        body: {
            data: res.rows as IProductComments[], total: null, //productComments can be empty
            error: null
        } as IRequestResponse
    }, {status: 200});
}
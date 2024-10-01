import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IProduct, IRequestResponse} from "@/components/utils";

export async function GET(request: NextRequest) {
    const productId = request.nextUrl.searchParams.get('productId');
    if (!productId) {
        return NextResponse.json({
            body: {
                data: [], total: null,
                error: ['Product Id is required']
            } as IRequestResponse
        }, {status: 400});
    }
    const res = await sql`SELECT * FROM products where product_id=${productId} limit 1`;
    if (res.rows.length === 0) {
        return NextResponse.json({
            body: {
                data: [],
                total: null,
                error: ['Product not found']
            } as IRequestResponse
        }, {status: 404});
    }
    return NextResponse.json({
        body: {
            data: res.rows[0] as IProduct[],
            total: null,
            error: []
        } as IRequestResponse
    }, {status: 200});
}
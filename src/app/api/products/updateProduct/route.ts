import {NextRequest, NextResponse} from "next/server";
import {IProduct, IRequestResponse} from "@/components/utils";
import {sql} from "@vercel/postgres";

export async function POST(request: NextRequest) {
    const product = await request.json() as IProduct;
    const res = await sql`Update products set 
                           name=${product.name},
                           description=${product.description},
                            price=${product.formatted_price},
                            is_active=${product.is_active},
                            buyer_address=${product.buyer_address}
                            buy_tx=${product.buy_tx},
                            image_url=${product.image_url},
                            is_active_reason=${product.is_active_reason},
                            buyer_chain=${product.buyer_chain},
                            where product_id=${product.product_id} returning *;
                            `;
    if (res.rows.length === 0) {
        return NextResponse.json({
            body: {
                data: [], total: null,
                error: ["Product couldn't be updated not found"]
            } as IRequestResponse
        }, {status: 404});
    }
    return NextResponse.json({
        body: {
            data: res.rows as IProduct[],
            total: null,
            error: []
        } as IRequestResponse
    }, {status: 200});
}
import {NextRequest, NextResponse} from "next/server";
import {IProduct, IRequestResponse} from "@/components/utils";
import {sql} from "@vercel/postgres";

export async function POST(request: NextRequest) {
    const body = await request.json() as IProduct;
    const errors = validateProduct(body);
    if (errors.length > 0) {
        return NextResponse.json({body: {data: [], total: null, error: errors} as IRequestResponse}, {status: 403});
    }
    const res = await sql`INSERT INTO products (
    tx_hash ,
    created_by ,
    formatted_price ,
    product_id ,
    name ,
    description,
    created_block ,
    is_active,
    buyer_address,
    buy_tx,
    image_url,
    is_active_reason,
    create_origin,
    buyer_chain
    ) VALUES (
        ${body.tx_hash },
        ${body.created_by },
        ${body.formatted_price },
        ${body.product_id },
        ${body.name },
        ${body.description},
        ${body.created_block },
        ${body.is_active },
        null,
        null,
        ${body.image_url},
        ${body.is_active_reason},
        ${body.create_origin},
        null
        )
        RETURNING *`;
    if (res.rows.length === 0) {
        return NextResponse.json({
            body: {
                data: [], total: null, error: ["Could not insert product"],
            } as IRequestResponse
        }, {status: 500});
    }
    return NextResponse.json({body: {data: [res.rows], total: null, error: null} as IRequestResponse}, {status: 200});
}

function validateProduct(product: IProduct): string[] {
    let validationErr = [];
    if (!product.tx_hash) {
        validationErr.push("TxHash is required")
    }
    if (!product.created_by) {
        validationErr.push("Created by address is required")
    }
    if (!product.product_id) {
        validationErr.push("Product Id is required")
    }
    if (!product.name) {
        validationErr.push("Product name is required")
    }
    if (!product.created_block) {
        validationErr.push("Created Block is required")
    }
    if (!product.formatted_price) {
        validationErr.push("Product price is required")
    }
    return validationErr;
}
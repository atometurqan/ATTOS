import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IProductComments, IRequestResponse} from "@/components/utils";

export async function POST(request: NextRequest) {
    const body = await request.json() as IProductComments;
    const errors = validateProductComment(body);
    if (errors.length > 0) {
        return NextResponse.json({body: {data: [], total: null, error: errors} as IRequestResponse}, {status: 403});
    }

    const res = await sql`INSERT INTO productcomments (
    id,
    product_id,
    user_id,
    rating,
    created_date,
    comment
    ) VALUES (
        ${body.product_id},
        ${body.user_id},
        ${body.rating},
        ${body.created_date as any},
        ${body.comment}
    )        
        RETURNING *`;
    if (res.rows.length === 0) {
        return NextResponse.json({
            body: {
                data: [], total: null, error: ["Could not insert productComment"],
            } as IRequestResponse
        }, {status: 500});
    }
    return NextResponse.json({body: {data: [res.rows], error: null} as IRequestResponse}, {status: 200});
}

function validateProductComment(productComment: IProductComments): string[] {
    let validationErr = [];
    if (!productComment.rating) {
        validationErr.push("Rating is required")
    }
    if (productComment.rating ! < 0 || productComment.rating ! > 5) {
        validationErr.push("Rating could not be less than 0 or greater than 5")
    }

    return validationErr;
}
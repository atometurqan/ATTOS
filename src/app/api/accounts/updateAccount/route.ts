import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IAccount, IRequestResponse} from "@/components/utils";

export async function POST(request: NextRequest) {
    const body = await request.json() as IAccount;
    const res = await sql`Update accounts SET 
                        created_at=${body.created_at as any},
                        linked_accounts=${body.linked_accounts},
                        wallet=${body.wallet},
                        google=${body.google},
                        mfa_methods=${body.mfa_methods},
                        has_accepted_terms=${body.has_accepted_terms},
                        is_guest=${body.is_guest} WHERE id = ${body.id} RETURNING *`;
    if (res.rows.length === 0) {
        return NextResponse.json({body: {error: "Account not found"}}, {status: 404});
    }
    return NextResponse.json({body: {data: res.rows as IAccount[], error: null} as IRequestResponse}, {status: 200});
}
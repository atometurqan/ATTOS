import {NextRequest, NextResponse} from "next/server";
import {sql} from "@vercel/postgres";
import {IAccount, IRequestResponse} from "@/components/utils";

export async function POST(request: NextRequest) {
    const body = await request.json() as IAccount;
    const res = await sql`INSERT INTO accounts (
                                        id,
                                        created_at,
                                        linked_accounts,
                                        wallet,google,
                                        mfa_methods,
                                        has_accepted_terms,
                                        is_guest
                                    ) VALUES (
                                        ${body.id},
                                        ${body.created_at as any},
                                        ${body.linked_accounts},
                                        ${body.wallet},
                                        ${body.google},
                                        ${body.mfa_methods},
                                        ${body.has_accepted_terms},
                                        ${body.is_guest}
                                        )`;
    if (res.rows.length === 0) {
        return NextResponse.json({
            body: {
                data: [], total: null,
                error: ["Could not save account"],
            } as IRequestResponse
        }, {status: 500});
    }
    return NextResponse.json({body: {data: res.rows, error: null} as IRequestResponse}, {status: 201});
}
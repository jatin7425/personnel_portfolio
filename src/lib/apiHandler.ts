import { NextResponse } from "next/server";

type HandlerFn = (req: Request) => Promise<NextResponse>;

export function withApiHandler(handler: HandlerFn) {
    return async (req: Request) => {
        try {
            return await handler(req);
        } catch (err) {
            console.error("API Error:", err);
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    };
}

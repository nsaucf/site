import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: Request) {
    if (!ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    try {
        const { password } = await req.json();

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const res = NextResponse.json({ success: true });
        res.cookies.set("admin_auth", "1", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return res;
    } catch {
        return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }
}

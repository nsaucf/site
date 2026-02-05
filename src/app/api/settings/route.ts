import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

const configPath = path.join(process.cwd(), "src/data/server-config.json");

export async function POST(req: Request) {
    // Basic auth check using the existing admin cookie pattern
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth");

    if (auth?.value !== "1") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const currentData = JSON.parse(await fs.readFile(configPath, "utf-8"));
        const newData = { ...currentData, ...body };

        await fs.writeFile(configPath, JSON.stringify(newData, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save settings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    // Only return non-sensitive info or require auth? 
    // For Admin UI, we need the current token to show (or hide it).
    // Use auth check.
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth");

    if (auth?.value !== "1") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await fs.readFile(configPath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ instagramAccessToken: "" });
    }
}

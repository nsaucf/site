import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { defaultContent } from "@/lib/contentLoader";

const contentPath = path.join(process.cwd(), "src/data/content.json");

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth");

    if (auth?.value !== "1") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();

        // Simple validation: ensure body has valid keys
        if (!body.execBoard && !body.events && !body.slideshow && !body.branding) {
            return NextResponse.json({ error: "Invalid data structure" }, { status: 400 });
        }

        let currentData = defaultContent;
        try {
            currentData = JSON.parse(await fs.readFile(contentPath, "utf-8"));
        } catch {
            // If file missing, start from defaults.
        }
        const newData = { ...currentData, ...body };

        await fs.writeFile(contentPath, JSON.stringify(newData, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save content:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = await fs.readFile(contentPath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch {
        return NextResponse.json(defaultContent);
    }
}

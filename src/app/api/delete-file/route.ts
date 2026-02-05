import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    // Auth Check
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth");
    if (auth?.value !== "1") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { url } = await req.json();

        if (!url || !url.startsWith("/uploads/")) {
            return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
        }

        const filename = path.basename(url);
        const uploadDirs = [
            path.join(process.cwd(), "public/uploads"),
            path.join(process.cwd(), ".next/standalone/public/uploads"),
        ];

        let deleted = false;

        for (const dir of uploadDirs) {
            const filePath = path.join(dir, filename);
            if (!filePath.startsWith(dir)) continue;
            try {
                await fs.unlink(filePath);
                deleted = true;
            } catch {
                // ignore missing
            }
        }

        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}

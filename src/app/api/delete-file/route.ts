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

        // Extract filename and secure path
        const filename = path.basename(url);
        const filePath = path.join(process.cwd(), "public/uploads", filename);

        // Verify it still points to uploads dir (anti-traversal check, though basename usage mostly handles this)
        if (!filePath.startsWith(path.join(process.cwd(), "public/uploads"))) {
            return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
        }

        // Check if exists
        try {
            await fs.access(filePath);
        } catch {
            // File doesn't exist, technically success for "ensure deleted"
            return NextResponse.json({ success: true, message: "File not found, assumed deleted" });
        }

        // Delete
        await fs.unlink(filePath);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}

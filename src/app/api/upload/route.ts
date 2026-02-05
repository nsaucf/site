import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    // Auth Check
    const cookieStore = await cookies();
    const auth = cookieStore.get("admin_auth");
    if (auth?.value !== "1") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Sanitize filename: replace spaces with underscores, lower case, keep weird chars out
        const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        // Add timestamp to avoid collisions
        const fileName = `${Date.now()}-${safeName}`;

        // Primary upload target plus standalone copy (for Next standalone builds)
        const uploadDirs = [
            path.join(process.cwd(), "public/uploads"),
            path.join(process.cwd(), ".next/standalone/public/uploads"),
        ];

        // Ensure dirs exist and write to each (best-effort for secondary)
        for (const dir of uploadDirs) {
            try {
                await fs.mkdir(dir, { recursive: true });
                const filePath = path.join(dir, fileName);
                await fs.writeFile(filePath, buffer);
            } catch (err) {
                // Ignore secondary write errors
                console.error("Upload write failed for", dir, err);
            }
        }

        const publicUrl = `/uploads/${fileName}`;
        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

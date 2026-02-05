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

        const uploadDir = path.join(process.cwd(), "public/uploads");

        // Ensure dir exists (redundant if we did mkdir, but safe)
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/${fileName}`;
        return NextResponse.json({ url: publicUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}

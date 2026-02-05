import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const configPath = path.join(process.cwd(), "src/data/server-config.json");

export async function GET() {
    try {
        const configData = JSON.parse(await fs.readFile(configPath, "utf-8"));
        const token = configData.instagramAccessToken;

        if (!token) {
            return NextResponse.json({ error: "No access token configured" }, { status: 404 });
        }

        // Fetch media from Instagram Basic Display API
        // Fields: id, caption, media_type, media_url, permalink, thumbnail_url, timestamp
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=6`;

        const response = await fetch(url);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Instagram API Error:", errorText);
            return NextResponse.json({ error: "Failed to fetch from Instagram" }, { status: response.status });
        }

        const data = await response.json();
        const posts = data.data || [];

        // Transform to a simple list of image URLs
        // Note: For VIDEO media_type, use thumbnail_url if available, else media_url
        const images = posts.map((post: any) => ({
            id: post.id,
            url: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
            permalink: post.permalink,
            caption: post.caption
        })).filter((img: any) => img.url); // Filter out any missing URLs

        return NextResponse.json({ images });

    } catch (error) {
        console.error("Instagram Route Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

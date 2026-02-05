import fs from "fs/promises";
import path from "path";

export const defaultContent = {
    execBoard: [] as any[],
    events: [] as any[],
    slideshow: [] as string[],
    branding: { logo: "" },
};

const contentPath = path.join(process.cwd(), "src/data/content.json");

export async function loadContent() {
    try {
        const raw = await fs.readFile(contentPath, "utf-8");
        return JSON.parse(raw);
    } catch {
        return defaultContent;
    }
}

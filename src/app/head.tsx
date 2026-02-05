import fs from "fs/promises";
import path from "path";

async function getBrandingLogo() {
    try {
        const contentPath = path.join(process.cwd(), "src/data/content.json");
        const raw = await fs.readFile(contentPath, "utf-8");
        const data = JSON.parse(raw);
        return data?.branding?.logo || "";
    } catch {
        return "";
    }
}

export default async function Head() {
    const logo = await getBrandingLogo();
    const iconHref = logo || "/favicon.ico";

    return (
        <>
            <link rel="icon" href={iconHref} />
            <link rel="shortcut icon" href={iconHref} />
            <link rel="apple-touch-icon" href={iconHref} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </>
    );
}

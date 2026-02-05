import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";
import fs from "fs/promises";
import path from "path";

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("http://localhost:3000");

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

export async function generateMetadata(): Promise<Metadata> {
  const logo = await getBrandingLogo();
  const iconUrl = logo || "/favicon.ico";

  return {
    title: "Neuroscience Alliance @ UCF",
    description: "Exploring brains, building community, and launching neuroscience futures.",
    metadataBase,
    icons: {
      icon: [{ url: iconUrl, sizes: "96x96", type: "image/png" }],
      shortcut: [{ url: iconUrl, sizes: "96x96", type: "image/png" }],
      apple: [{ url: iconUrl, sizes: "180x180", type: "image/png" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

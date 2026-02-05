import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

export async function Navbar() {
    const logoUrl = await getBrandingLogo();

    return (
        <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-nav-bg backdrop-blur-md supports-[backdrop-filter]:bg-nav-bg/60">
            <nav className="container flex h-[72px] items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3.5">
                    <div className="relative overflow-hidden" style={{ height: "96px", width: "96px" }}>
                        {logoUrl ? (
                            <Image
                                src={logoUrl}
                                alt="Neuroscience Alliance logo"
                                width={128}
                                height={128}
                                className="h-full w-full object-contain"
                                sizes="128px"
                                priority
                            />
                        ) : (
                            <div className="h-full w-full bg-primary/50 flex items-center justify-center text-xs font-bold text-accent">NSA</div>
                        )}
                    </div>
                    <span className="font-extrabold tracking-wide text-foreground">Neuroscience Alliance @ UCF</span>
                </Link>

                <div className="hidden gap-5 md:flex md:items-center">
                    <Link href="/#about" scroll className="text-sm font-medium text-muted transition-colors hover:text-foreground">About</Link>
                    <Link href="/events" className="text-sm font-medium text-muted transition-colors hover:text-foreground">Events</Link>
                    <Link href="/leadership" className="text-sm font-medium text-muted transition-colors hover:text-foreground">Leadership</Link>
                    {/* <Link href="/contact" className="text-sm font-medium text-muted transition-colors hover:text-foreground">Contact</Link> */}

                    <Button asChild className="ml-2">
                        <Link href="/#join" scroll>Become a Member</Link>
                    </Button>
                </div>
            </nav>
        </div>
    );
}

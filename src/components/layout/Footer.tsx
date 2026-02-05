import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/40 py-12">
            <div className="container flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted">© {new Date().getFullYear()} Neuroscience Alliance at UCF</p>
                    <p className="text-xs text-muted/60">Affiliated with University of Central Florida • Orlando, FL</p>
                </div>

                <div className="flex gap-6">
                    <Link href="mailto:neuroscienceallianceucf@gmail.com" className="text-sm text-muted hover:text-foreground">Contact</Link>
                </div>
            </div>
        </footer>
    );
}

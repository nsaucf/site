import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const isAuth = cookieStore.get("admin_auth")?.value === "1";

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0b1a30] via-[#0c2b4a] to-[#081225] text-foreground">
            <nav className="border-b border-white/10 bg-black/30 backdrop-blur-md px-6 py-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/admin" className="text-lg font-semibold text-foreground hover:text-accent transition-colors">
                        NSA Admin Panel
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-sm text-muted hover:text-foreground">View Site</Link>
                        {isAuth && (
                            <form action={async () => {
                                "use server";
                                const { cookies } = await import("next/headers");
                                (await cookies()).delete("admin_auth");
                                redirect("/admin/login");
                            }}>
                                <button type="submit" className="text-sm text-red-300 hover:text-red-200">Logout</button>
                            </form>
                        )}
                    </div>
                </div>
            </nav>
            <div className="container mx-auto py-10">
                {children}
            </div>
        </div>
    );
}

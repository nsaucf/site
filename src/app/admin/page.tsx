import Link from "next/link";
import { Users, Calendar } from "lucide-react";

export default function AdminDashboard() {
    const sections = [
        {
            title: "Leadership Team",
            description: "Manage Executive Board and Officers.",
            href: "/admin/leadership",
            icon: Users,
        },
        {
            title: "Events",
            description: "Add, edit, or remove upcoming events.",
            href: "/admin/events",
            icon: Calendar,
        },
        {
            title: "Branding",
            description: "Upload a logo for the site header.",
            href: "/admin/branding",
            icon: Calendar,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0f1b33] via-[#0a253f] to-[#0d1c33] px-8 py-10 shadow-2xl">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-sm uppercase tracking-[0.18em] text-accent">Admin</p>
                        <h1 className="text-4xl font-bold text-foreground">Control Center</h1>
                        <p className="mt-2 text-muted max-w-2xl">Update leaders, curate upcoming events, and keep the site fresh. Changes publish instantly once saved.</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-muted border border-white/10 shadow">
                        Signed in as admin
                    </div>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {sections.map((section) => (
                        <Link
                            key={section.href}
                            href={section.href}
                            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-accent/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent group-hover:bg-accent group-hover:text-background">
                                    <section.icon className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                                    <p className="text-sm text-muted">{section.description}</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-accent group-hover:text-background group-hover:bg-accent/80 group-hover:px-3 group-hover:py-1 group-hover:rounded-full transition-all">Open</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

import { LeadershipGrid } from "@/components/leadership/LeadershipGrid";
import { loadContent } from "@/lib/contentLoader";

export const metadata = {
    title: "Leadership | Neuroscience Alliance @ UCF",
    description: "Meet the student leaders and faculty advisors of the Alliance.",
};

export default async function LeadershipPage() {
    const content = await loadContent();
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#4fa7f5] via-[#4a9de6] to-[#0a1423] pt-24 pb-20 text-foreground">
            <div className="container">
                <header className="mb-12 flex flex-col gap-4">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Leadership
                    </h1>
                    <p className="max-w-2xl text-lg text-muted">
                        Meet the 2025-2026 Executive Board and Officers dedicated to building the neuroscience community at UCF.
                    </p>
                </header>

                <LeadershipGrid members={content.execBoard} />
            </div>
        </div>
    );
}

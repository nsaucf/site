import { Brain, Users2, Sparkles } from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "Our Mission",
        description:
            "To connect students across majors who are passionate about the brain, provide pathways into research and careers, and foster outreach that makes neuroscience accessible.",
    },
    {
        icon: Sparkles,
        title: "What We Do",
        description:
            "Weekly meetings with guest speakers, journal clubs, coding and wet‑lab workshops, graduate‑school panels, volunteer outreach, and collaborations with labs.",
    },
    {
        icon: Users2,
        title: "Who Can Join?",
        description:
            "Everyone! Biology, Psychology, CS/AI, ECE, Philosophy, HHP, Medicine — if you’re curious about brains, you’re welcome. No prior experience required.",
    },
];

export function Features() {
    return (
        <section id="about" className="py-20 lg:py-28 bg-background/20">
            <div className="container">
                <div className="mb-12 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About the Alliance</h2>
                    <p className="mt-4 max-w-2xl text-lg text-muted">
                        We are an interdisciplinary, inclusive, and impact‑driven community focused on neuroscience.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-8 shadow-sm transition-all hover:border-accent/50 hover:shadow-md"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-foreground">{feature.title}</h3>
                            <p className="text-muted leading-relaxed">
                                {feature.description}
                            </p>

                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

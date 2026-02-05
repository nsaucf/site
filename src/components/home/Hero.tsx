import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Slideshow } from "./Slideshow";
import { Users, Calendar, FlaskConical, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-background/20">
            {/* Decorative gradient background */}
            <div className="pointer-events-none absolute -top-24 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-[100px]" />
            <div className="pointer-events-none absolute top-40 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[80px]" />

            <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
                <div className="flex flex-col gap-6">
                    <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted backdrop-blur-sm">
                        Student Organization • University of Central Florida
                    </div>
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                        Exploring brains, <br className="hidden lg:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#ff9ad8]">
                            building community
                        </span>
                        .
                    </h1>
                    <p className="max-w-xl text-lg text-muted">
                        We’re a student‑led organization hosting talks, research workshops,
                        outreach, and social events for anyone curious about the brain —
                        from biology and psychology to AI and neurotech.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" asChild>
                            <Link href="#join" scroll>
                                Become a Member <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                        <div>
                            <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                                <Users className="h-5 w-5 text-accent" />
                                100+
                            </div>
                            <div className="text-sm text-muted">Active Members</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                                <Calendar className="h-5 w-5 text-accent" />
                                25+
                            </div>
                            <div className="text-sm text-muted">Annual Events</div>
                        </div>
                    </div>
                </div>

                {/* Right side: Slideshow */}
                <div className="relative">
                    <Slideshow />
                </div>
            </div>
        </section>
    );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Join() {
    return (
        <section id="join" className="py-20 bg-background/20">
            <div className="container">
                <div className="mb-12 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Join the Alliance</h2>
                        <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-muted">
                            No experience required
                        </span>
                    </div>
                </div>

                <div className="max-w-3xl">
                    <div className="rounded-2xl border border-white/10 bg-card p-8 shadow-sm">
                        <h3 className="mb-4 text-2xl font-bold text-foreground">Become a Member</h3>
                        <p className="mb-6 text-muted">
                            Membership is open year‑round. You’ll get event reminders, research opportunities, and first dibs on workshops with limited seats.
                        </p>
                        <Button asChild size="lg">
                            <Link href="https://knightconnect.campuslabs.com/engage/organization/nsaucf-netlify-app" target="_blank" rel="noopener noreferrer">
                                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

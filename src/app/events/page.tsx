import { EventCard } from "@/components/events/EventCard";
import { loadContent } from "@/lib/contentLoader";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Events | Neuroscience Alliance @ UCF",
    description: "Join us for workshops, lectures, and social events.",
};

export default async function EventsPage() {
    const content = await loadContent();
    const events = [...(content.events || [])].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-20">
            <div className="container">
                <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Upcoming Events
                        </h1>
                        <p className="max-w-xl text-lg text-muted">
                            Check out what's happening this semester. From research workshops to social mixers, there's always something going on.
                        </p>
                    </div>
                </header>

                <div className="grid gap-6">
                    {events.length > 0 ? (
                        events.map((event) => <EventCard key={event.id} event={event} />)
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-card p-12 text-center">
                            <h3 className="text-xl font-bold text-foreground">No upcoming events</h3>
                            <p className="mt-2 text-muted">Check back soon for updates!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

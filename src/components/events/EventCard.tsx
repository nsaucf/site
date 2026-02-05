import { Calendar, MapPin, Clock, CalendarPlus } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    type: string;
}

export function EventCard({ event }: { event: Event }) {
    const dateObj = new Date(event.date);
    const endObj = new Date(dateObj.getTime() + 60 * 60 * 1000); // default 1 hour

    const formatICSDate = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    const startStr = formatICSDate(dateObj);
    const endStr = formatICSDate(endObj);

    const googleHref = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startStr}/${endStr}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;

    const icsContent =
        `BEGIN:VCALENDAR\n` +
        `VERSION:2.0\n` +
        `PRODID:-//Neuroscience Alliance @ UCF//Events//EN\n` +
        `BEGIN:VEVENT\n` +
        `UID:${event.id}\n` +
        `DTSTAMP:${startStr}\n` +
        `DTSTART:${startStr}\n` +
        `DTEND:${endStr}\n` +
        `SUMMARY:${event.title}\n` +
        `DESCRIPTION:${event.description}\n` +
        `LOCATION:${event.location}\n` +
        `END:VEVENT\n` +
        `END:VCALENDAR`;

    const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-card p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-md md:flex-row md:items-start md:gap-6">
            {/* Date Badge */}
            <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 min-w-[80px]">
                <span className="text-sm font-bold uppercase tracking-wider text-accent">
                    {format(dateObj, "MMM")}
                </span>
                <span className="text-3xl font-extrabold text-foreground">
                    {format(dateObj, "d")}
                </span>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                    <Badge variant="secondary" className="uppercase tracking-wider">
                        {event.type}
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted">
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-accent" />
                        {format(dateObj, "h:mm a")}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-accent" />
                        {event.location}
                    </div>
                </div>

                <p className="mt-2 text-muted/90 max-w-2xl text-sm leading-relaxed">
                    {event.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Button asChild size="default" className="gap-2 rounded-xl px-4 py-2">
                        <a href={googleHref} target="_blank" rel="noopener noreferrer">
                            <CalendarPlus className="h-4 w-4" />
                            Add to Google Calendar
                        </a>
                    </Button>
                    <Button asChild size="default" variant="ghost" className="gap-2 rounded-xl border border-white/15 px-4 py-2">
                        <a href={icsHref} download={`${event.id || "event"}.ics`}>
                            <Calendar className="h-4 w-4" />
                            Add to Apple Calendar (.ics)
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { saveContent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Save } from "lucide-react";
import { format } from "date-fns";

type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    type: string;
};

export default function EventsEditor() {
    const [events, setEvents] = useState<Event[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Event | null>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((r) => r.json())
            .then((data) => setEvents(data?.events || []))
            .catch(() => setEvents([]));
    }, []);

    const handleEdit = (event: Event) => {
        setEditingId(event.id);
        setFormData({ ...event });
    };

    const handleAddNew = () => {
        const newEvent = {
            id: Date.now().toString(),
            title: "New Event",
            date: new Date().toISOString().substring(0, 16), // datetime-local format basic
            location: "Student Union",
            description: "",
            type: "meeting"
        };
        setEvents([...events, newEvent]);
        handleEdit(newEvent);
    };

    const handleDelete = (id: string) => {
        if (!confirm("Are you sure?")) return;
        setEvents(events.filter((e) => e.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setFormData(null);
        }
    };

    const handleSaveEvent = () => {
        if (!formData) return;
        setEvents(events.map((e) => (e.id === formData.id ? formData : e)));
        setEditingId(null);
        setFormData(null);
    };

    const handleSaveAll = async () => {
        setSaving(true);
        try {
            await saveContent({ events: events });
            alert("Saved successfully!");
        } catch (e) {
            alert("Error saving");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-2">
            {/* List */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Manage Events</h1>
                    <Button onClick={handleSaveAll} disabled={saving}>
                        {saving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save All</>}
                    </Button>
                </div>
                <Button onClick={handleAddNew} variant="ghost" className="mb-4 w-full border border-dashed border-white/20 hover:border-accent hover:bg-accent/5">
                    <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>

                <div className="space-y-3">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className={`rounded-xl border p-4 transition-all ${editingId === event.id
                                    ? "border-accent bg-accent/10"
                                    : "border-white/10 bg-card hover:border-white/20"
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="font-bold text-foreground">{event.title}</div>
                                    <div className="text-sm text-muted">
                                        {/* Try formatting, fallback if invalid date string during typing */}
                                        {(() => {
                                            try { return format(new Date(event.date), "MMM d, yyyy • h:mm a") }
                                            catch (e) { return event.date }
                                        })()}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost" onClick={() => handleEdit(event)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(event.id)} className="text-red-400 hover:text-red-300">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Form */}
            <div>
                {formData ? (
                    <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl sticky top-8">
                        <h2 className="mb-6 text-xl font-bold text-foreground">Edit Event</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted">Title</label>
                                <input
                                    className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-muted">Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-muted">Type</label>
                                    <select
                                        className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option value="meeting">General Meeting</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="social">Social</option>
                                        <option value="conference">Conference</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted">Location</label>
                                <input
                                    className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted">Description</label>
                                <textarea
                                    className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="ghost" onClick={() => { setFormData(null); setEditingId(null) }}>Cancel</Button>
                                <Button onClick={handleSaveEvent}>Done Editing</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-muted">
                        Select an event to edit
                    </div>
                )}
            </div>
        </div>
    );
}

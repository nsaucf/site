"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Mail, Linkedin, MoreHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Member = {
    id: string;
    name: string;
    role: string;
    category: string;
    bio: string;
    photo: string;
    email: string;
    linkedin: string;
};

interface LeadershipGridProps {
    members: Member[];
}

export function LeadershipGrid({ members }: LeadershipGridProps) {
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);

    const categories = [
        { id: "all", label: "All" },
        { id: "board", label: "Executive Board" },
        { id: "officer", label: "Officers" },
    ];

    const filteredMembers = members.filter((member) => {
        const matchesCategory = filter === "all" || member.category === filter;
        const matchesSearch =
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.role.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${filter === cat.id
                                ? "border-accent/60 bg-accent/20 text-accent shadow-sm"
                                : "border-white/10 bg-white/5 text-muted hover:bg-white/10"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        placeholder="Search leaders..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#0b1b30] py-2 pl-9 pr-4 text-foreground placeholder:text-muted/50 focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMembers.map((member) => (
                    <motion.div
                        key={member.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1f36] via-[#0c2136] to-[#0b1a30] shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
                    >
                        {member.category === "board" && (
                            <Badge variant="exec" className="absolute left-3 top-3 z-10">
                                Exec Board
                            </Badge>
                        )}

                        <div className={`aspect-[4/3] w-full overflow-hidden ${member.photo ? "relative" : "bg-gradient-to-br from-[#1a3d65] to-[#0d243e] flex items-center justify-center"}`}>
                            {member.photo ? (
                                <Image src={member.photo} alt={member.name} fill className="object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-[#d7e7ff]">
                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0b1a30]/80 to-transparent" />
                        </div>

                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-accent">
                                <span className="h-2 w-2 rounded-full bg-accent" />
                                {member.role}
                            </div>
                            <h3 className="mt-1 text-lg font-semibold text-foreground">{member.name}</h3>

                            <div className="mt-4 flex justify-between items-center">
                                {member.email ? (
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
                                    >
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </a>
                                ) : (
                                    <span className="text-xs text-muted">No email listed</span>
                                )}
                                <button
                                    onClick={() => setSelectedMember(member)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-colors hover:bg-white/10 hover:text-foreground"
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMember(null)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1f36] to-[#0b1a30] p-6 shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-white/10 hover:text-foreground"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex gap-4">
                                <div className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl ${selectedMember.photo ? "relative" : "bg-gradient-to-br from-[#1a3d65] to-[#0d243e] flex items-center justify-center"}`}>
                                    {selectedMember.photo ? (
                                        <Image src={selectedMember.photo} alt={selectedMember.name} fill className="object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold text-[#d7e7ff]">
                                            {selectedMember.name.split(" ").map((n) => n[0]).join("")}
                                        </span>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-foreground">{selectedMember.name}</h3>
                                    <div className="text-accent">{selectedMember.role}</div>
                                    <div className="mt-2 flex gap-3 text-muted">
                                        {selectedMember.email && (
                                            <a href={`mailto:${selectedMember.email}`} className="inline-flex items-center gap-1 hover:text-foreground">
                                                <Mail className="h-4 w-4" />
                                                Email
                                            </a>
                                        )}
                                        {selectedMember.linkedin && (
                                            <a href={selectedMember.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
                                                <Linkedin className="h-4 w-4" />
                                                LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="mb-2 text-sm font-semibold text-muted">About</h4>
                                <p className="text-sm leading-relaxed text-foreground/80">
                                    {selectedMember.bio || "No bio available."}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

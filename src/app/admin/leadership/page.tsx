"use client";

import { useEffect, useState } from "react";
import { saveContent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

export default function LeadershipEditor() {
    const [members, setMembers] = useState<Member[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((r) => r.json())
            .then((data) => setMembers(data?.execBoard || []))
            .catch(() => setMembers([]));
    }, []);

    // Form state
    const [formData, setFormData] = useState<Member | null>(null);

    const deleteIfLocal = async (url: string) => {
        if (url && url.startsWith("/uploads/")) {
            try {
                await fetch("/api/delete-file", {
                    method: "POST",
                    body: JSON.stringify({ url }),
                });
            } catch (e) {
                console.error("Failed to delete file from server", e);
            }
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0] || !formData) return;

        const file = e.target.files[0];
        setUploading(true);

        const uploadData = new FormData();
        uploadData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
                credentials: "include",
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            await deleteIfLocal(formData.photo);
            setFormData({ ...formData, photo: data.url });
            setMessage("Photo uploaded. Save member to persist.");
        } catch (err) {
            alert("Failed to upload image");
            console.error(err);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleEdit = (member: Member) => {
        setEditingId(member.id);
        setFormData({ ...member });
    };


    const handleAddNew = () => {
        const newMember = {
            id: Date.now().toString(),
            name: "New Member",
            role: "Member",
            category: "officer",
            bio: "",
            photo: "",
            email: "",
            linkedin: "",
        };
        setMembers([...members, newMember]);
        handleEdit(newMember);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;

        const member = members.find(m => m.id === id);
        if (member && member.photo && member.photo.startsWith("/uploads/")) {
            try {
                await fetch("/api/delete-file", {
                    method: "POST",
                    body: JSON.stringify({ url: member.photo }),
                });
            } catch (e) {
                console.error("Failed to delete file from server", e);
            }
        }

        setMembers(members.filter((m) => m.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setFormData(null);
        }
    };

    const handleSaveMember = () => {
        if (!formData) return;
        setMembers(members.map((m) => (m.id === formData.id ? formData : m)));
        setEditingId(null);
        setFormData(null);
    };

    const handleSaveAll = async () => {
        setSaving(true);
        try {
            await saveContent({ execBoard: members });
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
                    <h1 className="text-2xl font-bold text-foreground">Leadership Team</h1>
                    <Button onClick={handleSaveAll} disabled={saving}>
                        {saving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                    </Button>
                </div>
                <Button onClick={handleAddNew} variant="ghost" className="mb-4 w-full border border-dashed border-white/20 hover:border-accent hover:bg-accent/5">
                    <Plus className="mr-2 h-4 w-4" /> Add Member
                </Button>

                <div className="space-y-3">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className={`flex items-center justify-between rounded-xl border p-4 transition-all ${editingId === member.id
                                ? "border-accent bg-accent/10"
                                : "border-white/10 bg-card hover:border-white/20"
                                }`}
                        >
                            <div>
                                <div className="font-bold text-foreground">{member.name}</div>
                                <div className="text-sm text-muted">
                                    {member.role} • <Badge variant="secondary" className="text-[10px]">{member.category}</Badge>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(member)}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => handleDelete(member.id)} className="text-red-400 hover:text-red-300">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Form */}
            <div>
                {formData ? (
                    <div className="rounded-2xl border border-white/10 bg-card p-6 shadow-xl sticky top-8">
                        <h2 className="mb-6 text-xl font-bold text-foreground">Edit Member</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-muted">Name</label>
                                    <input
                                        className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-muted">Role</label>
                                    <input
                                        className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted">Category</label>
                                <select
                                    className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="board">Executive Board</option>
                                    <option value="officer">Officer/Director</option>
                                    <option value="advisor">Advisor</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-medium text-muted">Bio</label>
                                <textarea
                                    className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="mb-1 block text-xs font-medium text-muted">Photo</label>
                                <div className="flex flex-wrap gap-3 items-center">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/10 bg-background">
                                        {formData.photo ? (
                                            <img src={formData.photo} alt="Preview" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-muted">No photo</div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 gap-2 min-w-[200px]">
                                        <input
                                            className="flex-1 rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                            value={formData.photo}
                                            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                            placeholder="https://..."
                                        />
                                        <label className="relative inline-flex items-center justify-center rounded-full bg-accent text-white px-4 py-2 text-sm font-medium cursor-pointer select-none hover:brightness-105 transition disabled:opacity-50 disabled:cursor-not-allowed">
                                            {uploading ? "Uploading..." : "Upload"}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                                disabled={uploading}
                                            />
                                        </label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            type="button"
                                            disabled={!formData.photo}
                                            onClick={async () => {
                                                await deleteIfLocal(formData.photo);
                                                setFormData({ ...formData, photo: "" });
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-muted">Email</label>
                                    <input
                                        type="email"
                                        className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium text-muted">LinkedIn</label>
                                    <input
                                        className="w-full rounded-md bg-background px-3 py-2 text-foreground border border-white/10 focus:border-accent focus:outline-none"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="ghost" onClick={() => { setFormData(null); setEditingId(null) }}>Cancel</Button>
                                <Button onClick={handleSaveMember}>Done Editing</Button>
                            </div>
                            {message && <p className="text-xs text-muted">{message}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-muted">
                        Select a member to edit
                    </div>
                )}
            </div>
        </div>
    );
}

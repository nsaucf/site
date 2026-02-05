"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveContent } from "@/lib/api";

export default function BrandingPage() {
    const [logoUrl, setLogoUrl] = useState("");
    const [previousLogo, setPreviousLogo] = useState("");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/content")
            .then((r) => r.json())
            .then((data) => {
                if (data?.branding?.logo) {
                    setLogoUrl(data.branding.logo);
                    setPreviousLogo(data.branding.logo);
                }
            })
            .catch(() => null);
    }, []);

    const deleteIfLocal = async (url: string) => {
        if (url && url.startsWith("/uploads/")) {
            try {
                await fetch("/api/delete-file", {
                    method: "POST",
                    body: JSON.stringify({ url }),
                });
            } catch (e) {
                console.error("Failed to delete old logo", e);
            }
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        const file = e.target.files[0];
        setUploading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            await deleteIfLocal(logoUrl);
            setLogoUrl(data.url);
            setMessage("Upload successful. Save to publish.");
        } catch (err) {
            console.error(err);
            setMessage("Upload failed. Try again.");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            await saveContent({ branding: { logo: logoUrl } });
            // If logo was removed, clear previous reference and delete old file.
            if (!logoUrl) {
                await deleteIfLocal(previousLogo);
                setPreviousLogo("");
            } else {
                // Update previous reference to new saved logo.
                setPreviousLogo(logoUrl);
            }
            setMessage(logoUrl ? "Logo saved. It will appear on the site header." : "Logo removed.");
        } catch (err) {
            console.error(err);
            setMessage("Failed to save. Try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleClear = async () => {
        if (logoUrl) {
            await deleteIfLocal(logoUrl);
        }
        setLogoUrl("");
        setMessage("Logo cleared. Save to publish.");
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f1f36] via-[#0c253c] to-[#0b1a30] p-8 shadow-xl">
                <div className="flex flex-col gap-2">
                    <p className="text-sm uppercase tracking-[0.18em] text-accent">Branding</p>
                    <h1 className="text-3xl font-bold text-foreground">Site Logo</h1>
                    <p className="text-muted max-w-2xl">
                        Upload a logo to display in the top-left of the site. Transparent PNG works best.
                    </p>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1fr_320px] md:items-start">
                    <div className="space-y-4">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-foreground">Upload Logo</h3>
                                    <p className="text-sm text-muted">PNG, SVG, or JPG. Max 5MB recommended.</p>
                                </div>
                                <div className="flex gap-2">
                                    <label className="relative inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-foreground hover:bg-white/15">
                                        {uploading ? "Uploading..." : "Choose File"}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                            disabled={uploading}
                                        />
                                    </label>
                                    <Button variant="ghost" onClick={handleClear} className="rounded-xl border border-white/10">
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button onClick={handleSave} disabled={saving} className="rounded-xl px-6">
                                {saving ? "Saving..." : "Save Logo"}
                            </Button>
                                    {message && <p className="text-sm text-muted">{message}</p>}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
                        <p className="mb-3 text-sm font-semibold text-muted">Preview</p>
                        <div className="flex h-32 items-center gap-3 rounded-xl border border-white/10 bg-nav-bg px-4">
                            <div className="relative overflow-hidden" style={{ height: "96px", width: "96px" }}>
                                {logoUrl ? (
                                    <img src={logoUrl} alt="Logo preview" className="h-full w-full object-contain" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-accent">NSA</div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-semibold text-foreground">Neuroscience Alliance @ UCF</span>
                                <span className="text-xs text-muted">Site header preview</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

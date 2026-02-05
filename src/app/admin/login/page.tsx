"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                setError(data?.error || "Login failed");
                return;
            }

            router.push("/admin");
        } catch (err) {
            console.error("Login error", err);
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-8 shadow-xl">
                <h1 className="mb-6 text-2xl font-bold text-foreground">Admin Login</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-muted">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-background px-4 py-2 text-foreground focus:border-accent focus:outline-none"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in..." : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

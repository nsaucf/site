export async function saveContent(data: Record<string, any>) {
    const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save content");
    return res.json();
}

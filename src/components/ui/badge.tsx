import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "secondary" | "exec";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
    const variants = {
        default: "bg-primary text-primary-foreground border-transparent",
        secondary: "bg-white/10 text-muted border-transparent",
        outline: "text-foreground",
        exec: "bg-accent/20 text-accent border border-accent/40",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
        >
            {children}
        </div>
    );
}

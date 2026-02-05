import React from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    variant?: "default" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        // We don't have Radix Slot installed yet, so I'll skip "asChild" implementation logic for now 
        // and just use a standard button, but keep props interface for future.
        // Actually, I'll remove Slot usage for now to avoid dependency error if I didn't install @radix-ui/react-slot.

        const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            default: "bg-gradient-to-b from-accent to-[#ff9ad8] text-white hover:brightness-105 shadow-sm rounded-2xl border border-white/10 backdrop-blur-sm",
            ghost: "bg-[rgba(255,255,255,0.06)] text-primary-foreground border border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.1)] rounded-2xl",
            link: "text-link underline-offset-4 hover:underline",
        };

        const sizes = {
            default: "h-11 px-5 py-3",
            sm: "h-8 px-3 text-xs",
            lg: "h-12 px-8",
            icon: "h-9 w-9",
        };

        const variantStyles = variants[variant] || variants.default;
        const sizeStyles = sizes[size] || sizes.default;

        return (
            <button
                className={cn(baseStyles, variantStyles, sizeStyles, className)}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };

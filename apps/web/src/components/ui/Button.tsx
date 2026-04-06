"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap border text-xs font-medium uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-[var(--radius-control)] [box-shadow:var(--panel-frame-shadow)]",
  {
    variants: {
      variant: {
        default:
          "border-[var(--accent-primary)] text-[var(--text-inverse)] [background-image:var(--button-fill-primary)] hover:[box-shadow:var(--panel-shadow-hover)] active:[transform:var(--button-press-transform)]",
        secondary:
          "border-[var(--border-strong)] text-[var(--accent-secondary)] [background-image:var(--button-fill-secondary)] hover:border-[var(--accent-secondary)] hover:text-[var(--text-primary)] active:[transform:var(--button-press-transform)]",
        tertiary:
          "border-[var(--border-accent)] text-[var(--accent-tertiary)] [background-image:var(--button-fill-tertiary)] hover:border-[var(--accent-tertiary)] hover:text-[var(--text-primary)] active:[transform:var(--button-press-transform)]",
        quaternary:
          "border-[var(--accent-quaternary)] bg-transparent text-[var(--accent-quaternary)] hover:bg-[var(--accent-quaternary)]/14 hover:text-[var(--text-primary)] active:[transform:var(--button-press-transform)]",
        ghost:
          "border-[var(--border-default)] text-[var(--text-secondary)] [background-image:var(--button-fill-ghost)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)] hover:[box-shadow:var(--panel-frame-shadow)] active:[transform:var(--button-press-transform)]",
        destructive:
          "border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)] hover:text-[var(--destructive-foreground)] active:[transform:var(--button-press-transform)]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 py-1.5",
        lg: "h-12 px-8 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn("transition-[background-color,border-color,color,box-shadow,transform]", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

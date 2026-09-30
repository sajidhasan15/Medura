import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Shadcn UI button, themed with the Medura brand palette (#0f4cda).
 * `asChild` renders the styles on a child element (e.g. `next/link`), which is
 * how every call-to-action on the marketing pages is wired.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-[color,background-color,border-color,box-shadow,transform,translate,scale,rotate] duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-[#0f4cda]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#0f4cda] text-white shadow-[0_18px_35px_-20px_rgba(15,76,218,0.9)] hover:-translate-y-0.5 hover:bg-[#0c3cb0]",
        white:
          "border border-white bg-white text-slate-900 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.6)] hover:-translate-y-0.5 hover:shadow-[0_28px_55px_-30px_rgba(15,23,42,0.7)]",
        /** Light-grey pill with a dark label — the hero's secondary "Contact Now" CTA. */
        light:
          "bg-slate-100 text-slate-900 shadow-[0_16px_35px_-26px_rgba(15,23,42,0.5)] hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white hover:shadow-[0_24px_45px_-26px_rgba(15,23,42,0.6)]",
        outline:
          "border border-slate-900/10 bg-white/35 text-slate-800 backdrop-blur-sm hover:-translate-y-0.5 hover:border-slate-900/20 hover:bg-white/70",
        secondary: "bg-slate-900/5 text-slate-900 hover:bg-slate-900/10",
        glass:
          "border border-white/70 bg-white/60 text-slate-900 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.55)] backdrop-blur-xl hover:-translate-y-0.5 hover:bg-white/80",
        ghost: "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900",
        link: "text-[#0f4cda] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4",
        default: "h-11 px-6",
        lg: "h-13 px-7 text-base",
        /** Pill built for the hero CTA: leaves room for the circular icon lead. */
        xl: "h-16 gap-3 p-2 pr-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

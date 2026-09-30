import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DECORATIVE_PLUSES = [
  { className: "top-[15%] left-[5%] size-12 sm:size-14", strokeWidth: 3 },
  { className: "top-[44%] left-[27%] size-16", strokeWidth: 2.5 },
  { className: "bottom-[10%] left-[38%] size-20 sm:size-24", strokeWidth: 3 },
  { className: "top-[12%] right-[13%] size-24 sm:size-28", strokeWidth: 3 },
  { className: "top-[46%] right-[4%] size-14 sm:size-20", strokeWidth: 3 },
  { className: "bottom-[14%] right-[27%] size-12 sm:size-16", strokeWidth: 2.5 },
];

interface Breadcrumb {
  label: string;
  href: string;
}

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-36 pb-16 sm:pt-40 lg:pt-48 lg:pb-24 flex flex-col items-center justify-center text-center",
        className
      )}
    >
      {/* Soft blue → lavender → pink gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,#e5ebff_0%,#e9e5fb_32%,#f3e3f2_66%,#fbe2e5_100%)]"
      />

      {/* Light blooms + faint plus marks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-28 -left-32 h-96 w-96 rounded-full bg-white/55 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-[26rem] w-[26rem] rounded-full bg-[#f8c9d6]/45 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-white/40 blur-3xl" />

        {DECORATIVE_PLUSES.map((plus) => (
          <Plus
            key={plus.className}
            strokeWidth={plus.strokeWidth}
            className={cn("absolute text-white/55", plus.className)}
          />
        ))}
      </div>

      <div className="relative z-30 mx-auto w-full max-w-4xl px-5 sm:px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center justify-center space-x-2 text-sm font-medium text-slate-500">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center space-x-2">
                {index > 0 && <ChevronRight className="size-4" />}
                <Link
                  href={crumb.href}
                  className={cn(
                    "hover:text-slate-900 transition-colors",
                    index === breadcrumbs.length - 1 &&
                      "text-slate-900 pointer-events-none"
                  )}
                >
                  {crumb.label}
                </Link>
              </div>
            ))}
          </nav>
        )}

        <h1 className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-[54px] lg:text-[62px]">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

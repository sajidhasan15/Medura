"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/utils";

/**
 * Primary site navigation. Hash links ("/#services") work from any route because
 * the router resolves them against the homepage.
 */
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "Blog", href: "/posts" },
  { label: "FAQs", href: "/faqs" },
];

const MOBILE_NAV_ITEMS = [...NAV_ITEMS, { label: "Contact", href: "/contact" }];

export function Header() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none absolute top-0 left-0 z-50 flex w-full justify-center px-4 pt-4 sm:pt-6">
      <header className="pointer-events-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-white/60 bg-white/85 px-3 py-2 shadow-[0_20px_45px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:px-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          aria-label="Medura — home"
          className="group flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1.5 pr-2 transition-colors hover:bg-blue-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f4cda] text-white shadow-sm shadow-blue-600/30 transition-transform duration-300 group-hover:scale-105">
            <svg
              width="15"
              height="15"
              viewBox="0 0 28 28"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 2C11 0.89543 11.8954 0 13 0H15C16.1046 0 17 0.89543 17 2V11H26C27.1046 11 28 11.8954 28 13V15C28 16.1046 27.1046 17 26 17H17V26C17 27.1046 16.1046 28 15 28H13C11.8954 28 11 27.1046 11 26V17H2C0.89543 17 0 16.1046 0 15V13C0 11.8954 0.89543 11 2 11H11V2Z" />
            </svg>
          </span>
          <span className="text-[21px] font-bold tracking-tight text-slate-900">Medura</span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              !item.href.includes("#") &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-[13px] font-semibold transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2",
                  isActive
                    ? "bg-blue-50 text-[#0f4cda]"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/appointments"
            className="hidden items-center gap-2 rounded-full bg-[#0f4cda] px-5 py-2.5 text-[13px] font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-[#0c3cb0] hover:shadow-lg hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2 active:scale-[0.98] sm:inline-flex"
          >
            <span>Book Appointment</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <MobileNav items={MOBILE_NAV_ITEMS} />
        </div>
      </header>
    </div>
  );
}

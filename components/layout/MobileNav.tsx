"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu automatically on route changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-[76px] z-50 mx-4 max-h-[calc(100vh-96px)] overflow-y-auto rounded-[28px] border border-slate-200/80 bg-white/95 p-5 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.5)] backdrop-blur-xl">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {items.map((item) => {
              const isActive =
                !item.href.includes("#") &&
                (pathname === item.href || pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-semibold transition-colors",
                    isActive
                      ? "bg-blue-50 text-[#0f4cda]"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-2.5 border-t border-slate-200/80 pt-5">
            <a
              href="tel:911"
              className="flex items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency Hotline: 911</span>
            </a>

            <Link
              href="/appointments"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0f4cda] px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/25 transition-colors hover:bg-[#0c3cb0]"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

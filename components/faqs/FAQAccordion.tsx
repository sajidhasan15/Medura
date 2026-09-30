"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { WPContent } from "@/components/common/WPContent";

interface FAQItem {
  id: string;
  title: string;
  content: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <span className="text-base font-bold text-slate-900 dark:text-white pr-4">
                {faq.title}
              </span>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                  isOpen
                    ? "bg-blue-600 text-white rotate-180"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                  <WPContent html={faq.content} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Plus, Minus } from "lucide-react";

const FAQ_DATA = [
  {
    id: 1,
    question: "How do I book an appointment?",
    answer: "You can easily book an appointment through our online booking system, by phone, or by visiting our clinic reception."
  },
  {
    id: 2,
    question: "Do you offer emergency services?",
    answer: "Yes, we offer 24/7 emergency services. Our dedicated critical care team is always on standby for any medical emergencies."
  },
  {
    id: 3,
    question: "Can I get online consultations?",
    answer: "Yes, our specialists are available for online video consultations so you can get medical advice from the comfort of your home."
  },
  {
    id: 4,
    question: "Are your doctors certified?",
    answer: "Absolutely. All our doctors are highly experienced and board-certified in their respective medical fields."
  },
  {
    id: 5,
    question: "Do you accept health insurance?",
    answer: "We accept most major health insurance plans. Please contact our support team with your policy details to verify coverage."
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Heading and Support Links */}
          <div>
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
              Support
            </span>
            <h2 className="mt-3 mb-5 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
              Frequently asked
              <br />
              questions
            </h2>
            <p className="mb-8 max-w-sm text-base leading-relaxed font-medium text-slate-500">
              For any unanswered questions, contact our support team via email. We're here to help!
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/faqs"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f4cda] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c3cb0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
              >
                <span>Visit help centre</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <a
                href="mailto:support@medura.com"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
              >
                <Mail className="h-4 w-4" />
                <span>Email support</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <ul className="space-y-4">
            {FAQ_DATA.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full cursor-pointer text-left group flex flex-col rounded-2xl bg-[#F4F6FC] p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
                  >
                    <div className="flex w-full items-center justify-between gap-6">
                      <span className="text-[15px] font-bold text-slate-900">
                        {item.id}. {item.question}
                      </span>
                      
                      {/* Smooth Rotating Icon Container */}
                      <div className="relative flex h-6 w-6 shrink-0 items-center justify-center text-slate-800">
                        <Plus
                          className={`absolute h-5 w-5 transition-all duration-300 ease-out ${
                            isOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
                          }`}
                        />
                        <Minus
                          className={`absolute h-5 w-5 transition-all duration-300 ease-out ${
                            isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
                          }`}
                        />
                      </div>
                    </div>
                    
                    {/* Smooth Accordion Body */}
                    <div
                      className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100 mt-3"
                          : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pr-8 text-sm leading-relaxed text-slate-600 pb-1">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
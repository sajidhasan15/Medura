"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const SERVICES = [
  {
    name: "Cardiology",
    description:
      "Advanced cardiac imaging, interventional procedures and continuous rhythm monitoring.",
    surface: "bg-[#F4F6FC]",
    icon: (
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    ),
  },
  {
    name: "Ophthalmology",
    description:
      "Comprehensive eye diagnostics, laser correction and retinal care for every age group.",
    surface: "bg-[#F8EDFE]",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M3 12s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" />
      </>
    ),
  },
  {
    name: "Dermatology",
    description:
      "Medical and cosmetic skin treatments delivered by fellowship-trained dermatologists.",
    surface: "bg-[#FEF0EF]",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    name: "Neurology",
    description:
      "Expert care for brain, spinal cord, and nervous system conditions with modern diagnostics.",
    surface: "bg-[#F0FDF4]",
    icon: <path d="M12 2a10 10 0 1 0 10 10H12V2z" />,
  },
  {
    name: "Orthopedics",
    description:
      "Specialized treatments for bones, joints, ligaments, tendons, and muscles.",
    surface: "bg-[#FFFBEB]",
    icon: <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />,
  },
];

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Handle responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) setItemsPerView(1); // Mobile
      else if (window.innerWidth < 1024) setItemsPerView(2); // Tablet
      else setItemsPerView(3); // Desktop
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Ensure index stays within bounds on window resize
  useEffect(() => {
    if (currentIndex > SERVICES.length - itemsPerView) {
      setCurrentIndex(Math.max(0, SERVICES.length - itemsPerView));
    }
  }, [itemsPerView, currentIndex]);

  const nextSlide = () => {
    if (currentIndex < SERVICES.length - itemsPerView) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section id="services" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
            Services
          </span>
          <h2 className="mt-3 mb-5 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
            Excellent healthcare
            <br />
            services nearby
          </h2>
          <p className="text-base leading-relaxed font-medium text-slate-500">
            From consultation to recovery, we are here to support every step of your health journey.
          </p>
        </div>

        {/* CSS Transform based Carousel */}
        <div className="mb-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
              >
                <Link
                  href="/departments"
                  className={`${service.surface} group flex h-full flex-col rounded-[32px] border border-transparent p-8 transition-all duration-300 hover:border-[#0f4cda] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2 sm:p-10`}
                >
                  <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f4cda] text-white shadow-md shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </svg>
                  </span>

                  <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
                    {service.name}
                  </h3>
                  <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                    {service.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-[#0f4cda]">
                    Explore department
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            type="button"
            aria-label="Previous services"
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2 ${
              currentIndex === 0
                ? "cursor-not-allowed opacity-50"
                : "hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= SERVICES.length - itemsPerView}
            type="button"
            aria-label="Next services"
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2 ${
              currentIndex >= SERVICES.length - itemsPerView
                ? "cursor-not-allowed opacity-50"
                : "hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
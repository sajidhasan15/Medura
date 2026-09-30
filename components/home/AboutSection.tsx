"use client";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- Data ---
const STATS_DATA = [
  { target: 5, suffix: "K+", label: "Patient Served" },
  { target: 22, suffix: "+", label: "Patient Served" },
  { target: 96, suffix: "%", label: "Patient Served" },
];

// --- Sub-Components ---
function CountUpNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2.5, ease: "easeOut" });
    }
  }, [isInView, target, count]);

  return (
    <span className="block text-4xl font-black tracking-tighter text-slate-900 sm:text-5xl md:text-6xl">
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// --- Main Component ---
export function AboutSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="about" className="bg-white py-16 sm:py-20 lg:py-28 relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-10 lg:gap-14">
          
          {/* Top Row: Heading & Description */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12">
            {/* Heading */}
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl">
                About Us
              </h2>
            </div>

            {/* Description */}
            <div className="lg:col-span-8">
              <p className="max-w-4xl text-lg font-medium leading-[1.5] tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
                Your happiness is our mission.{" "}
                <span className="font-normal text-slate-600">
                  Our health and hospital policy outlines the strategies and practices technology
                  companies use to meet their goals. These policies can differ based on the company's size, and competition.
                </span>
              </p>
            </div>
          </div>

          {/* Bottom Row: Stats & Images (Aligned to Bottom) */}
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
            
            {/* Stats (Left) */}
            <div className="lg:col-span-5">
              <dl className="flex w-full gap-6 sm:gap-10 lg:w-auto">
                {STATS_DATA.map((stat, index) => (
                  <div key={index} className="flex flex-col">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <CountUpNumber target={stat.target} suffix={stat.suffix} />
                      <span className="mt-2 block text-sm font-medium text-slate-500 sm:text-base">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Images (Right) */}
            <div className="lg:col-span-7">
              <div className="flex w-full items-stretch gap-4 lg:justify-end h-[220px] sm:h-[260px]">
                
                {/* Portrait Image */}
                <div className="relative w-[130px] shrink-0 overflow-hidden rounded-[20px] bg-slate-100 sm:w-[170px] h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=600&fit=crop"
                    alt="Doctor portrait"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Landscape Image with Play Button */}
                <div className="relative flex-1 overflow-hidden rounded-[20px] bg-slate-100 h-full group">
                  <Image
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&h=400&fit=crop"
                    alt="Consultation room"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20" /> 
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    aria-label="Play the hospital introduction video"
                    className="absolute top-1/2 left-1/2 z-10 flex h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0f4cda] shadow-xl transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
                  >
                    <Play size={24} className="ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Video Modal Popup */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6"
          >
            {/* Modal Backdrop Click to Close */}
            <div 
              className="absolute inset-0 cursor-pointer" 
              onClick={() => setIsVideoOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-red-600"
              >
                <X size={20} />
              </button>
              
              {/* Updated Video Link with autoplay */}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/DHzi7Y4ca0A?si=HkiBEWLA1Pko1cY0&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
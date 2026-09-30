import Image from "next/image";
import Link from "next/link";
import { Activity, Mic, Phone, ScanLine, Video } from "lucide-react";

export function QualityCareSection() {
  const emergencyHotline = process.env.NEXT_PUBLIC_EMERGENCY_HOTLINE || "911";

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          {/* Media */}
          <div className="relative h-[380px] overflow-hidden rounded-[40px] sm:h-[500px]">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=1000&fit=crop"
              alt="Clinician supporting a patient"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />

            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-4">
              <button
                type="button"
                aria-label="Start a video consultation"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-red-500 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.6)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40"
              >
                <Video size={20} className="fill-current" />
              </button>

              <a
                href={`tel:${emergencyHotline.replace(/[^\d+]/g, "")}`}
                aria-label="Call the emergency hotline"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.6)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40"
              >
                <Phone size={20} className="rotate-[135deg] fill-current" />
              </a>

              <button
                type="button"
                aria-label="Send a voice note to the care team"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-600 shadow-[0_20px_40px_-20px_rgba(15,23,42,0.6)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40"
              >
                <Mic size={20} className="fill-current" />
              </button>
            </div>
          </div>

          {/* Copy */}
          <div className="flex h-full flex-col justify-center rounded-[40px] bg-[#FEF0EF] p-9 sm:p-12">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
              Quality care
            </span>
            <h2 className="mt-3 mb-5 text-3xl leading-tight font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[44px]">
              Your reliable source
              <br />
              for quality care
            </h2>
            <p className="mb-10 max-w-sm text-base leading-relaxed font-medium text-slate-600">
              Dedicated to providing compassionate support and exceptional medical expertise every
              step of the way.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f4cda] text-white">
                  <Activity className="h-5 w-5" />
                </span>
                <span className="text-sm leading-tight font-bold text-slate-900">
                  Advanced
                  <br />
                  Diagnostics
                </span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f4cda] text-white">
                  <ScanLine className="h-5 w-5" />
                </span>
                <span className="text-sm leading-tight font-bold text-slate-900">
                  Modern
                  <br />
                  Technology
                </span>
              </div>
            </div>

            <Link
              href="/appointments"
              className="inline-flex max-w-max items-center gap-2 rounded-full bg-[#0f4cda] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c3cb0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEF0EF]"
            >
              Book an appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

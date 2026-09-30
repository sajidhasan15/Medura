import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Transparent-background portrait served straight from the WordPress media library. */
const DOCTOR_IMAGE_SRC =
  "https://api.sajidhasan.dev/wp-content/uploads/2026/09/6931071ed0f4f2361dbc5fe0_portrait-young-doctor-holding-stethoscope-1-1.webp";
const DOCTOR_IMAGE_WIDTH = 1312;
const DOCTOR_IMAGE_HEIGHT = 1724;

const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&h=96&fit=crop",
];

const CARE_TAGS = [
  { label: "Dental", active: true },
  { label: "Monitoring", active: false },
  { label: "Healthcare", active: false },
  { label: "Rehabilitation", active: true },
];

/**
 * Faint white plus marks scattered across the gradient. Positions are literal
 * class strings (not computed) so Tailwind can statically extract them.
 */
const DECORATIVE_PLUSES = [
  { className: "top-[15%] left-[5%] size-12 sm:size-14", strokeWidth: 3 },
  { className: "top-[44%] left-[27%] size-16", strokeWidth: 2.5 },
  { className: "bottom-[10%] left-[38%] size-20 sm:size-24", strokeWidth: 3 },
  { className: "top-[12%] right-[13%] size-24 sm:size-28", strokeWidth: 3 },
  { className: "top-[46%] right-[4%] size-14 sm:size-20", strokeWidth: 3 },
  { className: "bottom-[14%] right-[27%] size-12 sm:size-16", strokeWidth: 2.5 },
];

export function HeroSection() {
  return (
    <section
      aria-label="Blending care with innovation"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-0"
    >
      {/* Soft blue → lavender → pink gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,#e5ebff_0%,#e9e5fb_32%,#f3e3f2_66%,#fbe2e5_100%)]"
      />

      {/* Light blooms + faint plus marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* ── Left column: headline + calls to action + 185k+ card ─────────── */}
        <div className="relative z-30 lg:pt-2">
          <h1 className="text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] text-slate-950 sm:text-[54px] lg:text-[62px] xl:text-[72px]">
            Blending Care
            <br />
            With Innovation
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:max-w-lg sm:text-lg">
            Redefining the standards of modern healthcare through continuous innovation and human
            connection.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary CTA — "Free Consultation" with green hover */}
            
            <Button
              asChild
              variant="white"
              size="xl"
              className="group h-16 gap-4 border border-white/80 bg-white p-2 pr-8 text-base text-slate-900 shadow-[0_12px_28px_-15px_rgba(15,23,42,0.15)] transition-colors duration-300 hover:!bg-blue-800 hover:!text-white sm:gap-5 sm:pr-10 sm:text-lg"
            >
              <Link href="/appointments">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#0f4cda] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-blue-800">
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.25}
                  />
                </span>
                <span className="font-bold transition-colors duration-300 group-hover:text-white">
                  Free Consultation
                </span>
              </Link>
            </Button>

            {/* Secondary CTA — "Contact Now" with dark blue hover */}
            <Button
              asChild
              variant="light"
              size="xl"
              className="h-16 px-9 text-base font-bold text-slate-900 transition-colors duration-300 hover:bg-blue-900 hover:text-white sm:px-10 sm:text-lg [&:hover]:text-white"
            >
              <Link href="/contact" className="transition-colors duration-300 hover:text-white">
                Contact Now
              </Link>
            </Button>
          </div>

          {/* Left Side Card (185k+) positioned directly below the CTA buttons */}
          <div className="mt-8 w-full max-w-[360px] sm:max-w-[390px]">
            <Card className="w-full max-w-[840px] overflow-hidden rounded-[36px] border-[3px] border-white bg-transparent shadow-none ">
              {/* Stat + two-line supporting copy */}
              <div className="flex items-center gap-4 px-6 pt-6 pb-5">
                <p className="text-4xl leading-none font-black tracking-tight text-slate-950 sm:text-[42px]">
                  185k+
                </p>
                <p className="max-w-[11rem] text-sm leading-snug font-medium text-slate-600 ">
                  Empower your team with an all-in-one solution
                </p>
              </div>

              {/* Overlapping avatar stack inside a white pill + caption */}
              <div className="flex items-center gap-4 border-t border-slate-200/50 px-6 py-4">
                <span className="flex shrink-0 items-center rounded-full bg-white p-1.5 shadow-[0_4px_16px_rgba(15,23,42,0.08)]">
                  <span className="flex -space-x-3">
                    {AVATARS.map((src, index) => (
                      <span
                        key={src}
                        className="size-9 sm:size-10 overflow-hidden rounded-full bg-slate-200 ring-2 ring-white"
                      >
                        <Image
                          src={src}
                          alt={`Patient ${index + 1}`}
                          width={40}
                          height={40}
                          className="size-full object-cover"
                        />
                      </span>
                    ))}
                  </span>
                </span>
                <p className="text-sm leading-snug font-medium text-slate-600">Empower your</p>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Right column: portrait + floating stat cards ─────────────────── */}
        <div className="relative flex justify-center items-end">
          <Image
            src={DOCTOR_IMAGE_SRC}
            alt="Consultant physician smiling while holding a stethoscope"
            width={DOCTOR_IMAGE_WIDTH}
            height={DOCTOR_IMAGE_HEIGHT}
            priority
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 480px, 92vw"
            className="mx-auto h-auto w-full max-w-[380px] object-contain object-bottom drop-shadow-[0_30px_45px_rgba(15,23,42,0.10)] sm:max-w-[440px] lg:h-[580px] lg:w-auto xl:h-[640px]"
          />

                    {/* Card 1 — care tags ("Empower your team / One solution") */}
          <div className="absolute bottom-10 -left-4 sm:-left-6 lg:-left-4 z-20 w-[210px] sm:w-[228px] h-[230px]"> {/* এখানে h-[230px] যোগ করা হলো এবং sm:-right-6 কে sm:-left-6 করা হলো (যদি বাম পাশে থাকে) */}
            <Card className="h-full rounded-[26px] border border-white/80 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"> {/* h-full যোগ করা হলো */}
              <div className="rounded-xl bg-slate-50/80 p-2.5">
                <p className="text-sm font-bold text-slate-900">Empower your team</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">One solution</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {CARE_TAGS.map((tag) => (
                  <Badge
                    key={tag.label}
                    variant={tag.active ? "default" : "secondary"}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold",
                      tag.active
                        ? "bg-[#0f4cda] text-white hover:bg-[#0f4cda]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

                    {/* Card 1 — care tags ("Empower your team / One solution") */}
          <div className="absolute bottom-10 -left-4 sm:-left-6 lg:-left-4 z-20 w-[210px] sm:w-[228px] h-[230px]"> {/* এখানে h-[230px] যোগ করা হলো এবং sm:-right-6 কে sm:-left-6 করা হলো (যদি বাম পাশে থাকে) */}
            <Card className="h-full rounded-[26px] border border-white/80 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"> {/* h-full যোগ করা হলো */}
              <div className="rounded-xl bg-slate-50/80 p-2.5">
                <p className="text-sm font-bold text-slate-900">Empower your team</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">One solution</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {CARE_TAGS.map((tag) => (
                  <Badge
                    key={tag.label}
                    variant={tag.active ? "default" : "secondary"}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold",
                      tag.active
                        ? "bg-[#0f4cda] text-white hover:bg-[#0f4cda]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Card 2 — Trust Rate 99.99% */}
          <div className="absolute bottom-10 -right-4 sm:-right-6 lg:-right-4 z-20 w-[210px] sm:w-[228px] h-[230px]"> {/* এখানে h-[230px] যোগ করা হলো */}
            <Card className="h-full rounded-[26px] border border-white/80 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"> {/* p-6 কে p-5 করা হলো এবং h-full যোগ করা হলো */}
              <div className="flex items-center gap-2">
                <BadgeCheck className="size-5 text-[#0f4cda]" />
                <p className="text-sm font-bold text-slate-900">Trust Rate</p>
              </div>

              <p className="mt-4 text-[38px] leading-none font-black tracking-tight text-slate-950 sm:text-[40px]">
                99.99%
              </p>
              <p className="mt-3 text-xs leading-relaxed font-medium text-slate-500">
                Empower your team with an all-in-one solution
              </p>
            </Card>
          </div>

          {/* Card 1 — care tags ("Empower your team / One solution") */}
          {/* <div className="absolute bottom-10 -left-4 sm:-right-6 lg:-right-4 z-20 w-[210px] sm:w-[228px]">
            <Card className="rounded-[26px] border border-white/80 bg-white/95 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
              <div className="rounded-xl bg-slate-50/80 p-2.5">
                <p className="text-sm font-bold text-slate-900">Empower your team</p>
                <p className="mt-0.5 text-xs font-medium text-slate-500">One solution</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {CARE_TAGS.map((tag) => (
                  <Badge
                    key={tag.label}
                    variant={tag.active ? "default" : "secondary"}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold",
                      tag.active
                        ? "bg-[#0f4cda] text-white hover:bg-[#0f4cda]"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </Card>
          </div> */}

          {/* Card 2 — Trust Rate 99.99% */}
          {/* <div className="absolute bottom-10 -right-4 sm:-right-6 lg:-right-4 z-20 w-[210px] sm:w-[228px]">
            <Card className="rounded-[26px] border border-white/80 bg-white/95 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-2">
                <BadgeCheck className="size-5 text-[#0f4cda]" />
                <p className="text-sm font-bold text-slate-900">Trust Rate</p>
              </div>

              <p className="mt-4 text-[38px] leading-none font-black tracking-tight text-slate-950 sm:text-[40px]">
                99.99%
              </p>
              <p className="mt-3 text-xs leading-relaxed font-medium text-slate-500">
                Empower your team with an all-in-one solution
              </p>
            </Card>
          </div> */}
        </div>
      </div>
    </section>
  );
}

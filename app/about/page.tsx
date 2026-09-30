import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Users,
  Clock,
  HeartPulse,
  Sparkles,
  Heart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | Leading Patient Care & Medical Excellence",
  description:
    "Learn about Medura's legacy of compassionate care, our mission to redefine healthcare, cutting-edge technology, and patient-first philosophy.",
};

const STATS = [
  {
    value: "15+",
    label: "Years Experience",
    sublabel: "Clinical excellence & trusted leadership",
    icon: Award,
  },
  {
    value: "50k+",
    label: "Patients Healed",
    sublabel: "Lives transformed across the nation",
    icon: Users,
  },
  {
    value: "100+",
    label: "Specialists",
    sublabel: "Board-certified medical consultants",
    icon: Stethoscope,
  },
  {
    value: "24/7",
    label: "Emergency Care",
    sublabel: "Rapid critical response teams",
    icon: Clock,
  },
];

const CORE_VALUES = [
  {
    title: "Clinical Rigor",
    description:
      "Every procedure is governed by peer-reviewed evidence, strict hospital protocols, and continuous medical auditing.",
  },
  {
    title: "Radical Transparency",
    description:
      "Patients and families receive clear treatment plans, upfront transparent costs, and round-the-clock progress reporting.",
  },
  {
    title: "Human Dignity",
    description:
      "We treat every individual with unfailing empathy, recognizing the human spirit at the heart of healing.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-white font-sans text-slate-900">
      {/* ── 1. Hero Section ────────────────────────────────────────────── */}
      <PageHero
        title={
          <>
            Dedicated to Your Health
            <br />
            <span className="text-[#0f4cda]">& Well-being</span>
          </>
        }
        subtitle="A legacy of compassionate care and continuous medical innovation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      >
        <div className="flex flex-col items-center justify-center">
          <Badge
            variant="outline"
            className="mb-8 border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
          >
            About Medura Healthcare
          </Badge>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-[#0f4cda] px-8 font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-[#0c3cb0] hover:shadow-xl hover:shadow-blue-600/30"
            >
              <Link href="/appointments">
                <span>Book a Consultation</span>
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 rounded-full border-slate-200 bg-white/80 px-8 font-bold text-slate-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white"
            >
              <Link href="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </PageHero>

      {/* ── 2. Mission & Vision (3-Column Grid) ────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0f4cda]">
              Our Purpose
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Pioneering Tomorrow’s Healthcare Today
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
            {/* Column 1 (Left): Large text highlighting the core mission */}
            <div className="flex flex-col justify-between rounded-[32px] border border-slate-100 bg-[#F4F6FC] p-8 sm:p-10">
              <div>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#0f4cda] text-white shadow-md shadow-blue-600/25">
                  <HeartPulse className="size-6" />
                </span>

                <h3 className="mt-8 text-2xl font-black leading-snug tracking-tight text-slate-950 sm:text-3xl">
                  Redefining patient care with science, empathy, and innovation.
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
                  Our core mission is to eradicate boundaries in modern medicine. We combine
                  world-renowned medical professionals, groundbreaking diagnostics, and personalized
                  treatment pathways to bring hope and recovery to every patient.
                </p>
              </div>

              <div className="mt-8 border-t border-slate-200/60 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-[#0f4cda]">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Accreditation
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      JCI & ISO 9001 Certified Hospital
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 (Middle): Image container */}
            <div className="relative min-h-[380px] overflow-hidden rounded-[32px] shadow-[0_20px_45px_-20px_rgba(15,23,42,0.15)] sm:min-h-[460px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                alt="Medura Specialist Physician providing compassionate consultation"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="rounded-[32px] object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
                  Clinical Leadership
                </p>
                <p className="text-lg font-bold sm:text-xl">
                  Compassionate Care at Every Step
                </p>
              </div>
            </div>

            {/* Column 3 (Right): Two stacked cards */}
            <div className="flex flex-col gap-8">
              {/* Stacked Card 1 — Advanced Technology */}
              <div className="flex flex-1 flex-col justify-between rounded-[32px] border border-purple-100/60 bg-[#F8EDFE] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#9333ea] text-white shadow-md shadow-purple-600/20">
                    <Sparkles className="size-6" />
                  </span>

                  <h4 className="mt-6 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Advanced Technology
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    From 3T magnetic resonance imaging and precision robotic microsurgery to
                    AI-powered diagnostic triage, our facilities leverage the world’s most sophisticated
                    clinical innovations.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#9333ea]">
                  <span>Explore diagnostic tech</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>

              {/* Stacked Card 2 — Patient-Centric Approach */}
              <div className="flex flex-1 flex-col justify-between rounded-[32px] border border-rose-100/60 bg-[#FEF0EF] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[#e11d48] text-white shadow-md shadow-rose-600/20">
                    <Heart className="size-6" />
                  </span>

                  <h4 className="mt-6 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Patient-Centric Approach
                  </h4>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    We tailor care regimens to each individual. Dedicated clinical navigators,
                    stress-free appointment scheduling, and holistic recovery plans ensure patient
                    comfort from admission to discharge.
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#e11d48]">
                  <span>Learn about patient experience</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Stats Section ───────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50/70 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group rounded-3xl border border-white bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0f4cda] transition-colors duration-300 group-hover:bg-[#0f4cda] group-hover:text-white">
                    <Icon className="size-6" />
                  </span>

                  <p className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-base font-bold text-slate-900 sm:text-lg">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {stat.sublabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Core Values Section ─────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0f4cda]">
              Our Principles
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Guided by Integrity & Clinical Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {CORE_VALUES.map((val) => (
              <div
                key={val.title}
                className="rounded-3xl border border-slate-100 bg-[#F4F6FC]/50 p-8 transition-all duration-300 hover:border-blue-200 hover:bg-[#F4F6FC]"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 text-[#0f4cda]">
                  <CheckCircle2 className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-950">{val.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Call To Action Strip ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-16 text-white sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,76,218,0.35),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Experience World-Class Healthcare
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            Our team of fellowship-trained physicians and dedicated care staff are ready to help you
            achieve optimal health and recovery.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-13 rounded-full bg-[#0f4cda] px-9 font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-[#0c3cb0]"
            >
              <Link href="/appointments">Book an Appointment</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-13 rounded-full border-slate-700 bg-slate-800/80 px-9 font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-700"
            >
              <Link href="/contact">Contact Our Specialists</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, HeartPulse, ShieldCheck } from "lucide-react";

const FEATURES = [
  { title: "Personalized Care", Icon: HeartPulse },
  { title: "Expert Specialists", Icon: BadgeCheck },
  { title: "Trusted by Thousands", Icon: ShieldCheck },
];

export function WhyUsSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-8">
          
          {/* Left Column: Text & Feature Pills */}
          <div>
            <h2 className="mb-5 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
              Reason for
              <br />
              choosing us
            </h2>
            <p className="mb-10 max-w-md text-base leading-relaxed font-medium text-slate-500">
              From consultation to recovery, we are here to support every step of your health
              journey.
            </p>

            <ul className="space-y-4">
              {FEATURES.map(({ title, Icon }) => (
                <li
                  key={title}
                  className="flex items-center gap-4 rounded-full bg-white p-2.5 pr-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:max-w-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f4cda] text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Column: Portrait Image */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-[32px] sm:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
              alt="Professional medical specialist"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Info Cards */}
          <div className="flex flex-col gap-5 sm:gap-6">
            
            {/* Top Card */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F8EDFE] p-6 shadow-sm sm:p-8 sm:h-[228px]">
              <p className="mb-6 text-sm leading-relaxed font-medium text-slate-700">
                Modern medical knowledge guarantees that each patient enjoys the highest quality.
              </p>
              <Link
                href="/#services"
                className="inline-flex max-w-max items-center gap-3 rounded-full bg-white p-1.5 pr-5 shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f4cda] text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="text-xs leading-tight font-bold text-slate-900">
                  See How It
                  <br />
                  Works
                </span>
              </Link>
            </div>

            {/* Bottom Card */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FEF0EF] p-6 shadow-sm sm:p-8 sm:h-[228px]">
              <p className="mb-6 text-sm leading-relaxed font-medium text-slate-700">
                Our commitment goes beyond medicine — we focus on your overall well-being.
              </p>
              <Link
                href="/doctors"
                className="inline-flex max-w-max items-center gap-3 rounded-full bg-white p-1.5 pr-5 shadow-sm transition-all duration-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f4cda] text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span className="text-xs leading-tight font-bold text-slate-900">
                  Consult With
                  <br />
                  Our Doctor
                </span>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
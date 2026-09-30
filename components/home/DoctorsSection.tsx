import Image from "next/image";
import Link from "next/link";

const DOCTORS = [
  {
    name: "Dr. Edwards",
    specialty: "Cardiologist",
    surface: "bg-[#F5F0FF]",
    image: "https://headless.sajidhasan.dev/wp-content/uploads/2026/09/693174541424a72b6557ad7d_image-194.webp",
  },
  {
    name: "Dr. Devon",
    specialty: "Ophthalmologist",
    surface: "bg-[#F5F0FF]",
    image: "https://headless.sajidhasan.dev/wp-content/uploads/2026/09/69317454fd63428bc167d337_image-197.webp",
  },
  {
    name: "Dr. Hawkins",
    specialty: "Dermatologist",
    surface: "bg-[#F5F0FF]",
    image: "https://headless.sajidhasan.dev/wp-content/uploads/2026/09/69317454e025598c352b3a26_image-198.webp",
  },
];

export function DoctorsSection() {
  return (
    <section className="bg-white py-16 text-center sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl">
          <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
            Our specialists
          </span>
          <h2 className="mt-3 mb-5 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
            Meet with our
            <br />
            experienced doctors
          </h2>
          <p className="text-base leading-relaxed font-medium text-slate-500">
            From consultation to recovery, we are here to support every step of your health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
          {DOCTORS.map((doctor) => (
            <Link
              key={doctor.name}
              href="/doctors"
              className={`${doctor.surface} relative flex h-[380px] flex-col justify-end overflow-hidden rounded-[24px] p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2`}
            >
              {/* Doctor Image Container */}
              <div className="absolute inset-x-0 bottom-20 top-6">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain object-bottom"
                />
              </div>

              {/* White Info Card */}
              <div className="relative z-10 flex w-full items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">{doctor.specialty}</p>
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F6FC] text-[#0f4cda]">
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4l16 16M4 20L20 4" />
                    </svg>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4F6FC] text-[#0f4cda]">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
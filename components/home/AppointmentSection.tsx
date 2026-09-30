import Link from "next/link";
import { ArrowUpRight, CalendarCheck, ChevronDown } from "lucide-react";

const FIELD_CLASS =
  "w-full rounded-xl border border-transparent bg-[#F4F6FC] px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-200 focus:border-[#0f4cda]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f4cda]/25";
const LABEL_CLASS = "mb-2 block text-sm font-bold text-slate-900";

const SERVICES = ["Personalized Care", "Cardiology", "Ophthalmology", "Dermatology"];

export function AppointmentSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-12 rounded-[40px] border border-slate-100 bg-[#F8F9FB] p-7 sm:p-10 lg:flex-row lg:gap-16 lg:p-16">
          {/* Copy */}
          <div className="lg:w-1/2">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
              Appointments
            </span>
            <h2 className="mt-3 mb-6 text-3xl leading-tight font-bold tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-[56px]">
              Schedule your
              <br />
              appointment today
            </h2>
            <p className="mb-8 max-w-sm text-base leading-relaxed font-medium text-slate-500">
              Book your appointment today and get the expert care you deserve — same-day slots are
              released every morning.
            </p>

            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
            >
              <CalendarCheck className="h-4 w-4 text-[#0f4cda]" />
              <span>View available slots</span>
            </Link>
          </div>

          {/* Request form */}
          <div className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-[0_35px_70px_-55px_rgba(15,23,42,0.7)] sm:p-8 lg:w-1/2">
            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="appointment-first-name" className={LABEL_CLASS}>
                    First Name
                  </label>
                  <input
                    id="appointment-first-name"
                    name="firstName"
                    type="text"
                    placeholder="Jane"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="appointment-last-name" className={LABEL_CLASS}>
                    Last Name
                  </label>
                  <input
                    id="appointment-last-name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="appointment-email" className={LABEL_CLASS}>
                    Email Address
                  </label>
                  <input
                    id="appointment-email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    className={FIELD_CLASS}
                  />
                </div>
                <div>
                  <label htmlFor="appointment-phone" className={LABEL_CLASS}>
                    Phone Number
                  </label>
                  <input
                    id="appointment-phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="appointment-service" className={LABEL_CLASS}>
                    Service Type
                  </label>
                  <div className="relative">
                    <select
                      id="appointment-service"
                      name="service"
                      defaultValue={SERVICES[0]}
                      className={`${FIELD_CLASS} appearance-none pr-10`}
                    >
                      {SERVICES.map((service) => (
                        <option key={service}>{service}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="appointment-date" className={LABEL_CLASS}>
                    Preferred Date
                  </label>
                  <input
                    id="appointment-date"
                    name="date"
                    type="date"
                    className={`${FIELD_CLASS} text-slate-500`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="appointment-message" className={LABEL_CLASS}>
                  Message
                </label>
                <textarea
                  id="appointment-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us briefly what you need help with…"
                  className={`${FIELD_CLASS} resize-none`}
                />
              </div>

              {/* Client-side navigation into the real booking flow. */}
              <Link
                href="/appointments"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f4cda] py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0c3cb0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2 active:translate-y-0"
              >
                <span>Continue to booking</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <p className="text-center text-xs font-medium text-slate-400">
                You will confirm the exact slot and specialist on the booking page.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

/** Hospital footer navigation — every entry points at a real route. */
const FOOTER_COLUMNS = [
  {
    title: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/#about" },
      { label: "Services", href: "/#services" },
      { label: "Our Doctors", href: "/doctors" },
      { label: "Departments", href: "/departments" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Book Appointment", href: "/appointments" },
      { label: "FAQs", href: "/faqs" },
      { label: "Health Blog", href: "/posts" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

/**
 * Social profiles are configuration driven — nothing renders until a URL exists,
 * so the footer can never ship a dead link.
 */
const SOCIAL_LINKS = [
  { label: "Facebook", href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL, icon: "facebook" },
  { label: "X (Twitter)", href: process.env.NEXT_PUBLIC_SOCIAL_X_URL, icon: "x" },
  { label: "LinkedIn", href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL, icon: "linkedin" },
  { label: "YouTube", href: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL, icon: "youtube" },
].filter((link): link is { label: string; href: string; icon: string } => Boolean(link.href));

const SOCIAL_PATHS: Record<string, string> = {
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  linkedin:
    "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  youtube:
    "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27z",
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const emergencyHotline = process.env.NEXT_PUBLIC_EMERGENCY_HOTLINE || "911";

  return (
    <footer className="relative w-full overflow-hidden bg-[#111114] pt-20 pb-10 text-white">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand & newsletter */}
          <div className="space-y-8 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c82ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111114]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f4cda] text-white">
                <svg width="17" height="17" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 2C11 0.89543 11.8954 0 13 0H15C16.1046 0 17 0.89543 17 2V11H26C27.1046 11 28 11.8954 28 13V15C28 16.1046 27.1046 17 26 17H17V26C17 27.1046 16.1046 28 15 28H13C11.8954 28 11 27.1046 11 26V17H2C0.89543 17 0 16.1046 0 15V13C0 11.8954 0.89543 11 2 11H11V2Z" />
                </svg>
              </span>
              <span className="text-2xl font-bold tracking-tight">Medura</span>
            </Link>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
              <h3 className="mb-2 text-lg font-bold tracking-tight">Stay in good health</h3>
              <p className="mb-5 text-sm leading-relaxed text-white/60">
                Monthly prevention tips, screening reminders and hospital updates — no spam.
              </p>
              <form className="relative flex items-center">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-full border border-white/10 bg-[#0b0b0e] py-3.5 pl-5 pr-[120px] text-sm text-white placeholder:text-white/40 transition-colors focus:border-[#4c82ff] focus:outline-none focus:ring-2 focus:ring-[#4c82ff]/30"
                />
                <button
                  type="submit"
                  className="absolute top-1.5 right-1.5 bottom-1.5 rounded-full bg-[#0f4cda] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#0c3cb0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h4 className="mb-5 text-sm font-bold tracking-[0.14em] text-white/50 uppercase">
                  {column.title}
                </h4>
                <ul className="space-y-3.5 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block transition-all duration-200 hover:translate-x-0.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c82ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111114]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="mb-5 text-sm font-bold tracking-[0.14em] text-white/50 uppercase">
                Contact
              </h4>
              <ul className="space-y-3.5 text-sm text-white/70">
                <li>
                  <a
                    href={`tel:${emergencyHotline.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#4c82ff]" />
                    <span>Emergency: {emergencyHotline}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@medura.com"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#4c82ff]" />
                    <span>support@medura.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-2 leading-relaxed">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4c82ff]" />
                  <span>
                    123 Creative Street,
                    <br />
                    Innovation City, NY 10001
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row">
          <p className="text-center sm:text-left">
            © {currentYear} Metropolitan Health System. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.length > 0 && (
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-200 hover:border-[#0f4cda] hover:bg-[#0f4cda] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c82ff]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      fillRule="evenodd"
                      aria-hidden="true"
                    >
                      <path d={SOCIAL_PATHS[social.icon]} />
                    </svg>
                  </a>
                ))}
              </div>
            )}

            <Link
              href="/#top"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c82ff]"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to top</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Giant background wordmark */}
      <div className="pointer-events-none absolute -bottom-[4%] left-1/2 z-0 flex w-full -translate-x-1/2 justify-center overflow-hidden text-center select-none">
        <span className="text-[24vw] leading-none font-black tracking-tighter text-white/[0.03]">
          Medura
        </span>
      </div>
    </footer>
  );
}


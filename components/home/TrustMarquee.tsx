import React from "react";

const PARTNERS = [
  { label: "Logoipsum", glyph: "∞" },
  { label: "Northcare", glyph: "■" },
  { label: "LOOO", glyph: "LOOO" },
  { label: "Vitahealth", glyph: "◍" },
  { label: "Medigroup", glyph: "∞" },
];

export function TrustMarquee() {
  return (
    <section aria-label="Partner organisations" className="border-b border-slate-100 bg-white py-10 sm:py-12 overflow-hidden">
      
      <style>{`
        /* 1. Slower Right to Left Animation with Hardware Acceleration */
        @keyframes marqueeRtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee-rtl {
          /* Increased from 20s to 40s for a slower, calmer scroll */
          animation: marqueeRtl 40s linear infinite;
          /* Forces the browser to use GPU acceleration for buttery smooth rendering */
          will-change: transform;
        }

        /* 2. Smooth fade on both sides (Gradient Mask) */
        .fade-edges {
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-8 text-sm font-medium text-slate-500">
          Join 2,000+ companies already grow
        </p>

        {/* Marquee Container with the fade-edges class applied */}
        <div className="fade-edges flex w-full overflow-hidden opacity-60 transition-opacity duration-300 hover:opacity-100">
          
          {/* Render the list twice for the infinite illusion */}
          {[...Array(2)].map((_, i) => (
            <ul
              key={i}
              aria-hidden={i === 1 ? true : undefined}
              className="flex min-w-full shrink-0 animate-marquee-rtl items-center justify-around py-2"
            >
              {PARTNERS.map((partner, index) => (
                <li
                  key={`${partner.label}-${index}`}
                  className="flex items-center gap-2 whitespace-nowrap text-lg font-black tracking-tight text-slate-400 transition-colors duration-300 hover:text-slate-700 mx-4"
                >
                  <span aria-hidden className="text-2xl">
                    {partner.glyph}
                  </span>
                  <span>{partner.label}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
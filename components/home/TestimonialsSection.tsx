import Image from "next/image";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Cody Fisher",
    role: "Ophthalmology patient",
    rating: "4.9",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop",
    text: "The doctors were incredibly attentive and explained everything clearly. I felt cared for during my visit — highly recommended.",
  },
  {
    name: "Albert Flores",
    role: "Cardiology patient",
    rating: "4.9",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
    text: "The doctors were incredibly attentive and provided clear explanations. I felt well taken care of during my visit and follow-up.",
  },
  {
    name: "Robert Fox",
    role: "Dermatology patient",
    rating: "4.8",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=96&h=96&fit=crop",
    text: "Booking was simple, the clinic ran on time and the treatment plan was explained step by step. Truly reassuring care.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
              Patient stories
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
              Trusted experiences shared by our patients
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed font-medium text-slate-500">
            Real feedback from patients, highlighting the care and confidence they receive with
            every visit to our specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex h-full flex-col justify-between rounded-[32px] border border-slate-100 bg-[#F8F9FB] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_35px_60px_-45px_rgba(15,23,42,0.55)]"
            >
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#0f4cda]" aria-label="Rated 5 out of 5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-slate-300" aria-hidden />
                </div>

                <blockquote className="mb-10 text-sm leading-relaxed font-medium text-slate-600">
                  “{review.text}”
                </blockquote>
              </div>

              <figcaption className="flex items-center justify-between border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{review.name}</span>
                    <span className="block text-xs font-medium text-slate-500">{review.role}</span>
                  </span>
                </div>
                <span className="text-3xl leading-none font-black tracking-tight text-slate-900">
                  {review.rating}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

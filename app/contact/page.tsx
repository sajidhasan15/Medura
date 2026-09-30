import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contact & Hospital Locations",
  description: "Get in touch with Metropolitan Health System. Emergency services, outpatient scheduling, and direct hospital lines.",
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <PageHero
        title="Get In Touch"
        subtitle="We are here to help and answer any questions you might have. We look forward to hearing from you."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      >
        <Badge
          variant="outline"
          className="border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
        >
          Patient Support & Administration
        </Badge>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Emergency Callout Card */}
        <div className="mb-12 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-rose-900 dark:text-rose-100">
                Are you experiencing a medical emergency?
              </h2>
              <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mt-1">
                For chest pain, severe bleeding, breathing difficulty, or acute trauma, dial emergency services immediately.
              </p>
            </div>
          </div>
          <a
            href="tel:911"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all shrink-0 text-sm"
          >
            <Phone className="h-4 w-4" />
            <span>Call 911 Emergency</span>
          </a>
        </div>

        {/* Contact Grid: Details + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Hospital Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800">
                Hospital Information
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Main Medical Campus</div>
                    <div className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                      742 Evergreen Medical Parkway, Pavilion A, Metro City, NY 10001
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Appointments & Inquiries</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      Direct Line: <a href="tel:5550192834" className="text-blue-600 hover:underline">(555) 019-2834</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Email Communications</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      <a href="mailto:care@metropolitanhealth.org" className="text-blue-600 hover:underline">
                        care@metropolitanhealth.org
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Clinical Hours</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      Emergency Room: 24/7/365 <br />
                      Outpatient Clinics: Mon – Sat: 08:00 AM – 06:00 PM
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>HIPAA Compliant Patient Communications</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

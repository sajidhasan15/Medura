import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Phone } from "lucide-react";
import { getFAQs } from "@/lib/graphql/queries/faqs";
import { FAQAccordion } from "@/components/faqs/FAQAccordion";
import { FAQ } from "@/types/entities";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Patient Frequently Asked Questions (FAQs)",
  description: "Find answers regarding medical appointments, insurance, visiting hours, and clinical services.",
};

const SAMPLE_FAQS: FAQ[] = [
  {
    id: "faq-1",
    databaseId: 201,
    title: "How do I book an outpatient appointment with a specialist?",
    content:
      "<p>You can book an appointment directly through our online booking wizard, via our 24/7 hotline at <strong>(555) 019-2834</strong>, or using our AI clinical triage assistant. Same-day appointments are available depending on clinical urgency.</p>",
  },
  {
    id: "faq-2",
    databaseId: 202,
    title: "What medical insurance providers does Metropolitan Health accept?",
    content:
      "<p>We accept Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, and most major commercial HMO/PPO policies. Please present your insurance card during clinical check-in.</p>",
  },
  {
    id: "faq-3",
    databaseId: 203,
    title: "What should I bring to my initial specialist consultation?",
    content:
      "<p>Please bring a valid photo ID, active health insurance card, a list of current prescription medications, previous radiological scans (CD/DVD or reports), and any physician referral documents.</p>",
  },
  {
    id: "faq-4",
    databaseId: 204,
    title: "What are the visiting hours for inpatient wards?",
    content:
      "<p>Standard visiting hours are daily from <strong>08:00 AM to 08:00 PM</strong>. Intensive Care Unit (ICU) and Neonatal ICU visiting hours may vary and are restricted to immediate family members.</p>",
  },
  {
    id: "faq-5",
    databaseId: 205,
    title: "How does the 24/7 Emergency Department triage work?",
    content:
      "<p>Our Emergency Center utilizes the Emergency Severity Index (ESI). Critically ill and trauma patients are treated immediately. Average door-to-doctor times for urgent cases remain under 8 minutes.</p>",
  },
];

export default async function FAQsPage() {
  let faqs = SAMPLE_FAQS;
  try {
    const fetched = await getFAQs();
    if (fetched && fetched.length > 0) {
      faqs = fetched;
    }
  } catch {
    faqs = SAMPLE_FAQS;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about our medical care, hospital policies, and patient services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "FAQs", href: "/faqs" },
        ]}
      >
        <Badge
          variant="outline"
          className="border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
        >
          Patient Support Center
        </Badge>
      </PageHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Client Accordion Component */}
        <FAQAccordion faqs={faqs} />

        {/* Still have questions banner */}
        <div className="mt-12 rounded-3xl bg-blue-50 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 p-8 text-center space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Still have questions regarding your clinical care?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Our patient experience coordinators are on standby to guide you through bookings and referrals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="tel:5550192834"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-xs sm:text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call Helpline: (555) 019-2834</span>
            </a>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors text-xs sm:text-sm"
            >
              <span>Contact Department</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

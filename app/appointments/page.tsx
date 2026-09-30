import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Clock, Phone, Loader2 } from "lucide-react";
import { AppointmentBookingForm } from "@/components/appointments/AppointmentBookingForm";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Book Doctor Appointment",
  description: "Schedule outpatient and inpatient specialist consultations at Metropolitan Health System.",
};

export default function AppointmentsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <PageHero
        title="Schedule an Appointment"
        subtitle="Select your specialist and secure your consultation slot in real time."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Appointments", href: "/appointments" },
        ]}
      >
        <Badge
          variant="outline"
          className="border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
        >
          Hospital Outpatient Portal
        </Badge>
      </PageHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Benefits banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Verified Board Specialists</span>
          </div>
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Clock className="h-4 w-4 text-blue-500 shrink-0" />
            <span>Instant Digital Confirmation</span>
          </div>
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Phone className="h-4 w-4 text-rose-500 shrink-0" />
            <span>24/7 Rescheduling Helpline</span>
          </div>
        </div>

        {/* Booking Form wrapped in Suspense for useSearchParams */}
        <Suspense
          fallback={
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-sm text-slate-500">Loading appointment booking system...</p>
            </div>
          }
        >
          <AppointmentBookingForm />
        </Suspense>
      </div>
    </div>
  );
}

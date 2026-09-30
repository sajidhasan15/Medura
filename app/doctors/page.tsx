import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, Calendar, Clock, Award, ArrowRight } from "lucide-react";
import { getDoctors } from "@/lib/graphql/queries/doctors";
import { Doctor } from "@/types/entities";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Specialist Doctors Directory",
  description: "Browse board-certified doctors, surgeons, and specialists at Metropolitan Health System.",
};

const SAMPLE_DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    databaseId: 101,
    slug: "dr-sarah-jenkins",
    title: "Dr. Sarah Jenkins, MD",
    doctorDetails: {
      specialty: "Cardiovascular Surgery",
      qualifications: "Harvard Medical School | FACS",
      experienceYears: 16,
      consultationFee: 220,
      availableDays: ["Mon", "Wed", "Fri"],
      availableHours: "09:00 AM - 02:00 PM",
      rating: 4.9,
      roomNumber: "Wing B, Suite 402",
    },
    departments: {
      nodes: [{ id: "dep-cardio", databaseId: 1, slug: "cardiology", name: "Cardiology" }],
    },
  },
  {
    id: "doc-2",
    databaseId: 102,
    slug: "dr-marcus-vance",
    title: "Dr. Marcus Vance, MD",
    doctorDetails: {
      specialty: "Neurology & Brain Sciences",
      qualifications: "Johns Hopkins University | FAAN",
      experienceYears: 14,
      consultationFee: 240,
      availableDays: ["Tue", "Thu", "Sat"],
      availableHours: "10:00 AM - 04:00 PM",
      rating: 4.8,
      roomNumber: "Neuroscience Pavilion 3",
    },
    departments: {
      nodes: [{ id: "dep-neuro", databaseId: 2, slug: "neurology", name: "Neurology" }],
    },
  },
  {
    id: "doc-3",
    databaseId: 103,
    slug: "dr-elena-rostova",
    title: "Dr. Elena Rostova, MD",
    doctorDetails: {
      specialty: "Orthopedic & Joint Surgery",
      qualifications: "Stanford Medicine | FAAOS",
      experienceYears: 12,
      consultationFee: 195,
      availableDays: ["Mon", "Tue", "Thu"],
      availableHours: "08:30 AM - 01:30 PM",
      rating: 4.9,
      roomNumber: "Ortho Center 104",
    },
    departments: {
      nodes: [{ id: "dep-ortho", databaseId: 3, slug: "orthopedics", name: "Orthopedics" }],
    },
  },
  {
    id: "doc-4",
    databaseId: 104,
    slug: "dr-amara-patel",
    title: "Dr. Amara Patel, MD",
    doctorDetails: {
      specialty: "Pediatrics & Child Health",
      qualifications: "Columbia University | FAAP",
      experienceYears: 10,
      consultationFee: 175,
      availableDays: ["Wed", "Thu", "Fri", "Sat"],
      availableHours: "09:00 AM - 03:00 PM",
      rating: 5.0,
      roomNumber: "Children's Pavilion 201",
    },
    departments: {
      nodes: [{ id: "dep-ped", databaseId: 4, slug: "pediatrics", name: "Pediatrics" }],
    },
  },
];

export default async function DoctorsPage() {
  let doctors: Doctor[] = [];
  try {
    const fetched = await getDoctors(50);
    doctors = fetched.length > 0 ? fetched : SAMPLE_DOCTORS;
  } catch {
    doctors = SAMPLE_DOCTORS;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <PageHero
        title="Find a Specialist Doctor"
        subtitle="Browse our world-class medical team across 20+ specialized healthcare departments."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Doctors", href: "/doctors" },
        ]}
      >
        <Badge
          variant="outline"
          className="border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
        >
          Medical Staff Directory
        </Badge>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => {
            const details = doctor.doctorDetails;
            const primaryDept = doctor.departments?.nodes?.[0];

            return (
              <div
                key={doctor.id}
                className="flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      {doctor.title.replace("Dr. ", "").split(" ")[0]?.[0]}
                      {doctor.title.replace("Dr. ", "").split(" ")[1]?.[0] || ""}
                    </div>

                    {details?.rating && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200/60 dark:border-amber-900/60">
                        <Award className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{details.rating}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      <Link href={`/doctors/${doctor.slug}`} className="hover:text-blue-600 transition-colors">
                        {doctor.title}
                      </Link>
                    </h2>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                      {details?.specialty || "Specialist Physician"}
                    </p>
                    {primaryDept && (
                      <span className="inline-block mt-1 text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {primaryDept.name}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{details?.availableDays?.join(", ") || "Mon - Fri"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{details?.availableHours || "09:00 AM - 02:00 PM"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    href={`/doctors/${doctor.slug}`}
                    className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1 transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  <Link
                    href={`/appointments?doctor=${doctor.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
                  >
                    <Stethoscope className="h-3.5 w-3.5" />
                    <span>Book</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

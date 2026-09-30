import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Stethoscope,
  Calendar,
  Clock,
  Award,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { getDoctorBySlug, getDoctors } from "@/lib/graphql/queries/doctors";
import { Doctor } from "@/types/entities";

const SAMPLE_DOCTORS_BY_SLUG: Record<string, Doctor> = {
  "dr-sarah-jenkins": {
    id: "doc-1",
    databaseId: 101,
    slug: "dr-sarah-jenkins",
    title: "Dr. Sarah Jenkins, MD",
    content:
      "Dr. Sarah Jenkins is a board-certified Cardiovascular Surgeon with more than 16 years of clinical excellence in coronary artery bypass grafting, minimally invasive heart valve repair, and complex thoracic vascular reconstruction. She completed her residency and fellowship training at Harvard Medical School and Brigham and Women's Hospital.",
    doctorDetails: {
      specialty: "Cardiovascular Surgery",
      qualifications: "Harvard Medical School | FACS | Board Certified Thoracic Surgeon",
      experienceYears: 16,
      consultationFee: 220,
      availableDays: ["Monday", "Wednesday", "Friday"],
      availableHours: "09:00 AM - 02:00 PM",
      rating: 4.9,
      roomNumber: "Surgical Tower Wing B, Suite 402",
    },
    departments: {
      nodes: [{ id: "dep-cardio", databaseId: 1, slug: "cardiology", name: "Cardiology & Cardiac Surgery" }],
    },
  },
  "dr-marcus-vance": {
    id: "doc-2",
    databaseId: 102,
    slug: "dr-marcus-vance",
    title: "Dr. Marcus Vance, MD",
    content:
      "Dr. Marcus Vance is a renowned Neurologist specializing in neurodegenerative disorders, stroke rehabilitation, and clinical epilepsy treatment. He serves as Senior Clinical Consultant at the Metropolitan Neuroscience Pavilion.",
    doctorDetails: {
      specialty: "Neurology & Brain Sciences",
      qualifications: "Johns Hopkins University | FAAN",
      experienceYears: 14,
      consultationFee: 240,
      availableDays: ["Tuesday", "Thursday", "Saturday"],
      availableHours: "10:00 AM - 04:00 PM",
      rating: 4.8,
      roomNumber: "Neuroscience Pavilion Suite 301",
    },
    departments: {
      nodes: [{ id: "dep-neuro", databaseId: 2, slug: "neurology", name: "Neurology" }],
    },
  },
  "dr-elena-rostova": {
    id: "doc-3",
    databaseId: 103,
    slug: "dr-elena-rostova",
    title: "Dr. Elena Rostova, MD",
    content:
      "Dr. Elena Rostova specializes in robotic-assisted joint replacement, sports traumatology, and reconstructive orthopedic surgery. She has performed over 2,500 successful hip and knee arthroplasties.",
    doctorDetails: {
      specialty: "Orthopedic & Joint Surgery",
      qualifications: "Stanford Medicine | FAAOS",
      experienceYears: 12,
      consultationFee: 195,
      availableDays: ["Monday", "Tuesday", "Thursday"],
      availableHours: "08:30 AM - 01:30 PM",
      rating: 4.9,
      roomNumber: "Ortho Center Suite 104",
    },
    departments: {
      nodes: [{ id: "dep-ortho", databaseId: 3, slug: "orthopedics", name: "Orthopedics" }],
    },
  },
  "dr-amara-patel": {
    id: "doc-4",
    databaseId: 104,
    slug: "dr-amara-patel",
    title: "Dr. Amara Patel, MD",
    content:
      "Dr. Amara Patel is a dedicated Pediatrician focusing on neonatal intensive care, childhood developmental medicine, and pediatric asthma management. Passionate about family-centered pediatric clinical care.",
    doctorDetails: {
      specialty: "Pediatrics & Child Health",
      qualifications: "Columbia University | FAAP",
      experienceYears: 10,
      consultationFee: 175,
      availableDays: ["Wednesday", "Thursday", "Friday", "Saturday"],
      availableHours: "09:00 AM - 03:00 PM",
      rating: 5.0,
      roomNumber: "Children's Pavilion Suite 201",
    },
    departments: {
      nodes: [{ id: "dep-ped", databaseId: 4, slug: "pediatrics", name: "Pediatrics" }],
    },
  },
};

export async function generateStaticParams() {
  try {
    const doctors = await getDoctors(50);
    if (doctors && doctors.length > 0) {
      return doctors.map((doc) => ({ slug: doc.slug }));
    }
  } catch {
    // fallback
  }

  return Object.keys(SAMPLE_DOCTORS_BY_SLUG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doctor = SAMPLE_DOCTORS_BY_SLUG[slug];
  if (!doctor) return { title: "Doctor Profile" };

  return {
    title: `${doctor.title} - ${doctor.doctorDetails?.specialty || "Specialist"}`,
    description: `Consultation details and appointments for ${doctor.title} at Metropolitan Health System.`,
  };
}

export default async function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let doctor: Doctor | null = null;
  try {
    doctor = await getDoctorBySlug(slug);
  } catch {
    doctor = null;
  }

  if (!doctor) {
    doctor = SAMPLE_DOCTORS_BY_SLUG[slug] || null;
  }

  if (!doctor) {
    notFound();
  }

  const details = doctor.doctorDetails;
  const primaryDept = doctor.departments?.nodes?.[0];

  return (
    <div className="w-full min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Doctors</span>
        </Link>

        {/* Doctor Header Card */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-3xl shadow-md shrink-0">
              {doctor.title.replace("Dr. ", "").split(" ")[0]?.[0]}
              {doctor.title.replace("Dr. ", "").split(" ")[1]?.[0] || ""}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {primaryDept && (
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">
                    {primaryDept.name}
                  </span>
                )}
                {details?.rating && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                    <Award className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{details.rating} Star Rating</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {doctor.title}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
                {details?.specialty}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">{details?.qualifications}</p>
            </div>

            <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 flex sm:flex-col items-center sm:items-end justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase font-bold text-slate-400">Consultation Fee</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ${details?.consultationFee || "150"}
                </div>
              </div>
              <Link
                href={`/appointments?doctor=${doctor.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-95 transition-all text-sm"
              >
                <Stethoscope className="h-4 w-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Doctor Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Biography & Clinical Experience
              </h2>
              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                <p>{doctor.content || "Professional medical practitioner dedicated to comprehensive diagnostic and clinical patient outcomes."}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400">Clinical Experience</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {details?.experienceYears || 10}+ Years
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Consultation Room</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {details?.roomNumber || "Main Medical Wing"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Consultation Schedule
              </h3>
              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Days: {details?.availableDays?.join(", ") || "Mon - Fri"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Hours: {details?.availableHours || "09:00 AM - 02:00 PM"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{details?.roomNumber || "Outpatient Department"}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={`/appointments?doctor=${doctor.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors text-xs"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Select Time Slot</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

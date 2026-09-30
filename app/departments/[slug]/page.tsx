import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Stethoscope, CheckCircle } from "lucide-react";
import { Department } from "@/types/entities";

const SAMPLE_DEPTS_BY_SLUG: Record<string, Department & { procedures: string[]; head: string }> = {
  cardiology: {
    id: "dep-1",
    databaseId: 1,
    slug: "cardiology",
    name: "Cardiology & Heart Care",
    description:
      "Our Cardiology department provides diagnostic and interventional coronary procedures, rhythm management, and specialized preventive heart clinics staffed by internationally certified cardiothoracic teams.",
    procedures: [
      "Coronary Angiography & Stenting",
      "Heart Rhythm / Pacemaker Implantation",
      "Transcatheter Aortic Valve Replacement (TAVR)",
      "Pediatric & Adult Congenital Heart Interventions",
    ],
    head: "Dr. Sarah Jenkins, MD, FACS",
  },
  neurology: {
    id: "dep-2",
    databaseId: 2,
    slug: "neurology",
    name: "Neurology & Brain Sciences",
    description:
      "Comprehensive diagnostic evaluation and neurosurgical interventions for central and peripheral nervous system disorders, stroke emergencies, and memory disorders.",
    procedures: [
      "Stroke Thrombolytic Clinical Intervention",
      "Robotic-Guided Neurosurgical Procedures",
      "Epilepsy Video EEG Monitoring",
      "Neuro-Rehabilitation & Physical Therapy",
    ],
    head: "Dr. Marcus Vance, MD, FAAN",
  },
  orthopedics: {
    id: "dep-3",
    databaseId: 3,
    slug: "orthopedics",
    name: "Orthopedics & Joint Surgery",
    description:
      "State-of-the-art joint preservation, computer-assisted arthroplasty, complex trauma reconstruction, and specialized sports injury treatment.",
    procedures: [
      "Total Knee & Hip Arthroplasty",
      "Arthroscopic Meniscal & ACL Repairs",
      "Spine Minimally Invasive Surgery",
      "Pediatric Musculoskeletal Correction",
    ],
    head: "Dr. Elena Rostova, MD, FAAOS",
  },
  pediatrics: {
    id: "dep-4",
    databaseId: 4,
    slug: "pediatrics",
    name: "Pediatrics & Child Health",
    description:
      "Child-centered clinical medicine offering full spectrum pediatric care from newborn intensive care to adolescent healthcare and vaccination programs.",
    procedures: [
      "Neonatal Intensive Care Unit (Level 3 NICU)",
      "Pediatric Emergency & Urgent Triage",
      "Child Development & Autism Screening",
      "Pediatric Pulmonology & Allergy Care",
    ],
    head: "Dr. Amara Patel, MD, FAAP",
  },
};

export async function generateStaticParams() {
  return Object.keys(SAMPLE_DEPTS_BY_SLUG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = SAMPLE_DEPTS_BY_SLUG[slug];
  if (!dept) return { title: "Department" };

  return {
    title: `${dept.name} | Metropolitan Health`,
    description: dept.description,
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = SAMPLE_DEPTS_BY_SLUG[slug];

  if (!dept) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/departments"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Departments</span>
        </Link>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Clinical Center
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {dept.name}
              </h1>
              <p className="text-xs text-slate-500">Department Head: {dept.head}</p>
            </div>

            <Link
              href={`/doctors?department=${dept.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all text-xs sm:text-sm"
            >
              <Stethoscope className="h-4 w-4" />
              <span>Consult Specialists</span>
            </Link>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Overview & Clinical Scope
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {dept.description}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Core Clinical Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {dept.procedures.map((proc) => (
                <div
                  key={proc}
                  className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{proc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

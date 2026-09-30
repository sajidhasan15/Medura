import type { Metadata } from "next";
import Link from "next/link";
import { HeartPulse, ArrowRight, Stethoscope } from "lucide-react";
import { getDepartments } from "@/lib/graphql/queries/departments";
import { Department } from "@/types/entities";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Medical Departments & Clinical Services",
  description: "Explore clinical departments and medical facilities at Metropolitan Health System.",
};

const SAMPLE_DEPARTMENTS: Array<Department & { count: string; iconKey: string }> = [
  {
    id: "dep-1",
    databaseId: 1,
    slug: "cardiology",
    name: "Cardiology & Heart Care",
    description: "Comprehensive diagnostics, cardiac catheterization, angioplasty, and cardiovascular surgery.",
    count: "14 Specialists",
    iconKey: "cardio",
  },
  {
    id: "dep-2",
    databaseId: 2,
    slug: "neurology",
    name: "Neurology & Brain Sciences",
    description: "Advanced stroke management, neurosurgery, epilepsy clinical monitoring, and dementia care.",
    count: "9 Specialists",
    iconKey: "neuro",
  },
  {
    id: "dep-3",
    databaseId: 3,
    slug: "orthopedics",
    name: "Orthopedics & Joint Surgery",
    description: "Robotic joint arthroplasty, sports medicine, spinal surgery, and musculoskeletal rehabilitation.",
    count: "12 Specialists",
    iconKey: "ortho",
  },
  {
    id: "dep-4",
    databaseId: 4,
    slug: "pediatrics",
    name: "Pediatrics & Child Health",
    description: "Neonatal intensive care (NICU), pediatric cardiology, immunizations, and developmental medicine.",
    count: "11 Specialists",
    iconKey: "ped",
  },
];

export default async function DepartmentsPage() {
  let departments = SAMPLE_DEPARTMENTS;
  try {
    const fetched = await getDepartments();
    if (fetched && fetched.length > 0) {
      departments = fetched.map((d, index) => ({
        ...d,
        count: "Specialists Available",
        iconKey: index % 2 === 0 ? "cardio" : "neuro",
      }));
    }
  } catch {
    departments = SAMPLE_DEPARTMENTS;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <PageHero
        title="Specialized Medical Departments"
        subtitle="Delivering multidisciplinary healthcare across advanced outpatient and inpatient medical services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
        ]}
      >
        <Badge
          variant="outline"
          className="border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
        >
          Clinical Centers
        </Badge>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    <Link href={`/departments/${dept.slug}`} className="hover:text-blue-600 transition-colors">
                      {dept.name}
                    </Link>
                  </h2>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {dept.count}
                  </p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Link
                  href={`/departments/${dept.slug}`}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore Department</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/doctors?department=${dept.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Stethoscope className="h-3.5 w-3.5" />
                  <span>View Doctors</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

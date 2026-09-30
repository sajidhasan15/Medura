import type { Metadata } from "next";
import Link from "next/link";
import { gql } from "@apollo/client";
import {
  ArrowRight,
  HeartPulse,
  Eye,
  Activity,
  Brain,
  Bone,
  Baby,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Calendar,
} from "lucide-react";
import { getClient } from "@/lib/apollo-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Medical Services | Specialized Clinical Care",
  description:
    "Explore Medura's comprehensive range of specialized medical departments, clinical innovations, and outpatient surgical services.",
};

export const revalidate = 3600;

export const GET_SERVICES_DEPARTMENTS_QUERY = gql`
  query GetServicesDepartments($first: Int = 100) {
    departments(first: $first) {
      nodes {
        id
        databaseId
        slug
        title
        content
      }
    }
  }
`;

interface DepartmentNode {
  id: string;
  databaseId?: number;
  slug: string;
  title?: string;
  content?: string;
}

interface ServicesDepartmentResponse {
  departments?: {
    nodes?: DepartmentNode[];
  };
}

interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
}

/** Fallback medical departments in case WordPress backend is unseeded or unreachable */
const FALLBACK_SERVICES: ServiceCardItem[] = [
  {
    id: "serv-1",
    slug: "cardiology",
    title: "Cardiology & Heart Center",
    description:
      "Advanced cardiac imaging, interventional angioplasty, electrophysiology, and comprehensive cardiovascular rehabilitation.",
    category: "Cardiovascular Care",
    iconName: "heart",
  },
  {
    id: "serv-2",
    slug: "neurology",
    title: "Neurology & Brain Sciences",
    description:
      "Specialized diagnosis and treatment for complex neurological conditions, stroke management, neurosurgery, and epilepsy monitoring.",
    category: "Neurosciences",
    iconName: "brain",
  },
  {
    id: "serv-3",
    slug: "orthopedics",
    title: "Orthopedics & Joint Surgery",
    description:
      "State-of-the-art robotic joint replacements, sports injury medicine, spinal surgery, and customized musculoskeletal recovery.",
    category: "Musculoskeletal",
    iconName: "bone",
  },
  {
    id: "serv-4",
    slug: "pediatrics",
    title: "Pediatrics & Child Health",
    description:
      "Dedicated inpatient and outpatient care for infants, children, and adolescents with modern neonatal intensive care (NICU).",
    category: "Pediatric Care",
    iconName: "baby",
  },
  {
    id: "serv-5",
    slug: "ophthalmology",
    title: "Ophthalmology & Vision",
    description:
      "Precision laser vision correction, retinal micro-surgery, cataract removal, and pediatric ophthalmology by renowned specialists.",
    category: "Vision Care",
    iconName: "eye",
  },
  {
    id: "serv-6",
    slug: "dermatology",
    title: "Dermatology & Skin Science",
    description:
      "Comprehensive diagnostic screening, surgical mole removal, therapeutic laser treatments, and medical dermatology.",
    category: "Skin Health",
    iconName: "activity",
  },
];

function getServiceIcon(iconName: string) {
  switch (iconName) {
    case "heart":
      return <HeartPulse className="size-7" />;
    case "brain":
      return <Brain className="size-7" />;
    case "bone":
      return <Bone className="size-7" />;
    case "baby":
      return <Baby className="size-7" />;
    case "eye":
      return <Eye className="size-7" />;
    default:
      return <Activity className="size-7" />;
  }
}

function cleanHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function ServicesPage() {
  let services: ServiceCardItem[] = FALLBACK_SERVICES;

  try {
    const { data } = await getClient().query<ServicesDepartmentResponse>({
      query: GET_SERVICES_DEPARTMENTS_QUERY,
      context: {
        fetchOptions: {
          next: { revalidate: 3600, tags: ["departments"] },
        },
      },
    });

    const nodes = data?.departments?.nodes;
    if (nodes && nodes.length > 0) {
      services = nodes.map((node, index) => {
        const fallback = FALLBACK_SERVICES[index % FALLBACK_SERVICES.length];
        const cleanContent = cleanHtml(node.content);

        return {
          id: node.id,
          slug: node.slug,
          title: node.title || fallback.title,
          description: cleanContent || fallback.description,
          category: fallback.category,
          iconName: fallback.iconName,
        };
      });
    }
  } catch (error) {
    console.error("WPGraphQL error fetching departments for services page:", error);
    services = FALLBACK_SERVICES;
  }

  return (
    <div className="w-full bg-slate-50/50 font-sans text-slate-900">
      {/* ── 1. Header Section ──────────────────────────────────────────── */}
      <PageHero
        title="Our Medical Services"
        subtitle="Delivering multidisciplinary healthcare across advanced outpatient, inpatient, and emergency medical facilities with state-of-the-art clinical technologies."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      >
        <div className="flex flex-col items-center justify-center">
          <Badge
            variant="outline"
            className="mb-8 border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
          >
            Clinical Excellence
          </Badge>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#0f4cda] px-7 font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-300 hover:bg-[#0c3cb0]"
            >
              <Link href="/appointments">
                <Calendar className="mr-2 size-4" />
                <span>Schedule Appointment</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-slate-200 bg-white/80 px-7 font-bold text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white"
            >
              <Link href="/doctors">
                <Stethoscope className="mr-2 size-4" />
                <span>Meet Our Doctors</span>
              </Link>
            </Button>
          </div>
        </div>
      </PageHero>

      {/* ── 2. Services Grid ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0f4cda]">
                Specialties & Programs
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Comprehensive Patient Care
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Each clinical department is staffed by board-certified specialists, specialized nurses,
              and dedicated patient navigators.
            </p>
          </div>

          {/* 3-Column Services Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.1)]"
              >
                <div>
                  {/* Blue circular icon wrapper */}
                  <div className="flex size-14 items-center justify-center rounded-full bg-blue-50 text-[#0f4cda] shadow-inner transition-colors duration-300 group-hover:bg-[#0f4cda] group-hover:text-white">
                    {getServiceIcon(service.iconName)}
                  </div>

                  <span className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {service.category}
                  </span>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-[#0f4cda]">
                    <Link href={`/departments/${service.slug}`}>{service.title}</Link>
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Card Footer with ArrowRight Link Button */}
                <div className="mt-8 border-t border-slate-100 pt-5">
                  <Link
                    href={`/departments/${service.slug}`}
                    className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#0f4cda] transition-colors duration-200 hover:text-[#0c3cb0]"
                  >
                    <span>Explore Department</span>
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Emergency Support Banner ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-24">
        <div className="relative overflow-hidden rounded-[32px] border border-blue-100 bg-gradient-to-r from-blue-600 to-[#0f4cda] p-8 text-white shadow-xl sm:p-12">
          <div
            aria-hidden
            className="absolute -right-20 -bottom-20 size-72 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                24/7 Rapid Emergency Response
              </span>
              <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                Need Immediate Medical Assistance?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-blue-100 sm:text-base">
                Our trauma unit and emergency dispatch center operate around the clock with rapid
                triage response and specialized critical care teams.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:911"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-white px-8 font-bold text-[#0f4cda] shadow-md transition-all duration-300 hover:bg-blue-50 active:scale-95"
              >
                <PhoneCall className="size-4" />
                <span>Call Hotline (911)</span>
              </a>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-13 rounded-full border-white/40 bg-white/10 px-8 font-bold text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Link href="/contact">Emergency Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import type { BlogPostSummary } from "@/components/home/BlogSection";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { QualityCareSection } from "@/components/home/QualityCareSection";
import { FaqSection } from "@/components/home/FaqSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AppointmentSection } from "@/components/home/AppointmentSection";
import { getLatestPosts } from "@/lib/graphql/queries/posts";

// Revalidate the page (and the WordPress-driven blog strip) every hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Leading Patient Care & Medical Excellence",
  description:
    "World-class hospital care with specialised doctors, outpatient appointments, emergency services and AI clinical triage.",
};

export default async function HomePage() {
  // Latest WordPress posts — raw Gutenberg HTML is parsed by <WPContent /> and all
  // internal anchors inside it are rendered as Next.js <Link> for instant routing.
  const posts: BlogPostSummary[] = await getLatestPosts(3);

  return (
    <div id="top" className="flex min-h-screen w-full flex-col bg-white font-sans text-slate-900">
      <HeroSection />
      <TrustMarquee />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <DoctorsSection />
      <TestimonialsSection />
      <QualityCareSection />
      <FaqSection />
      <BlogSection posts={posts} />
      <AppointmentSection />
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { getLatestPosts } from "@/lib/graphql/queries/posts";
import { WPContent, WPText } from "@/components/common/WPContent";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Health Blog & Insights",
  description:
    "Evidence-based health guidance, prevention tips and hospital news published by Metropolitan Health System specialists.",
};

interface PostNode {
  id?: string;
  slug: string;
  title: string;
  date?: string | null;
  excerpt?: string | null;
  featuredImage?: {
    node?: { sourceUrl?: string | null; altText?: string | null } | null;
  } | null;
}

function formatDate(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function PostsPage() {
  let posts: PostNode[] = [];
  try {
    posts = await getLatestPosts(12);
  } catch {
    posts = [];
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <PageHero
        title="Health blog & insights"
        subtitle="Articles published straight from our WordPress editorial team — parsed into React with client-side routing."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/posts" },
        ]}
      >
        <Badge
          variant="outline"
          className="border-slate-300/60 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0f4cda] shadow-sm backdrop-blur-md order-first -mt-8"
        >
          Health Journal
        </Badge>
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Newspaper className="mx-auto mb-4 h-8 w-8 text-slate-400" />
            <h2 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
              No articles published yet
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm text-slate-600 dark:text-slate-400">
              New patient guidance is published every month. In the meantime, our specialists are
              available for consultation.
            </p>
            <Link
              href="/appointments"
              className="inline-flex items-center gap-2 rounded-full bg-[#0f4cda] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0c3cb0]"
            >
              <span>Book an appointment</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id ?? post.slug}
                className="group flex flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_60px_-45px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-900"
              >
                <Link href={`/posts/${post.slug}`} className="flex h-full flex-col p-4">
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[24px] bg-slate-100 dark:bg-slate-800">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAE9F8] via-[#F4E3EC] to-[#FCE2E3]">
                        <span className="text-xs font-bold tracking-[0.14em] text-slate-500 uppercase">
                          Metropolitan
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{formatDate(post.date) || "Latest article"}</span>
                  </p>

                  <h2 className="text-lg leading-snug font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#0f4cda] dark:text-white">
                    <WPText html={post.title} />
                  </h2>
                </Link>

                {post.excerpt ? (
                  <WPContent
                    html={post.excerpt}
                    className="line-clamp-3 px-4 pb-6 text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400"
                  />
                ) : (
                  <div className="pb-6" />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

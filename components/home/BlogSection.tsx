import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { WPContent, WPText } from "@/components/common/WPContent";

/** Shape of the post nodes returned by the `GetLatestPosts` WPGraphQL query. */
export interface BlogPostSummary {
  id?: string;
  slug: string;
  title: string;
  date?: string | null;
  excerpt?: string | null;
  featuredImage?: {
    node?: { sourceUrl?: string | null; altText?: string | null } | null;
  } | null;
}

/** Design placeholders used when WordPress returns no published posts yet. */
const PLACEHOLDER_POSTS: BlogPostSummary[] = [
  { slug: "decoding-your-symptoms", title: "Decoding Your Symptoms: A Physician's Perspective" },
  { slug: "interpreting-your-symptoms", title: "Interpreting Your Symptoms: Expert Advice from a Doctor" },
  { slug: "understanding-your-symptoms", title: "Understanding Your Symptoms: Insights from a Medical Professional" },
];

function formatDate(value?: string | null) {
  if (!value) return "Latest article";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Latest article";
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogSection({ posts }: { posts: BlogPostSummary[] }) {
  const articles = posts.length > 0 ? posts : PLACEHOLDER_POSTS;
  const linkToIndex = posts.length === 0;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold tracking-[0.18em] text-[#0f4cda] uppercase">
              Health journal
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-5xl">
              Our health blogs &amp; insights
            </h2>
          </div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-2"
          >
            <span>View all articles</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {articles.map((post) => {
            const href = linkToIndex ? "/posts" : `/posts/${post.slug}`;
            const image = post.featuredImage?.node?.sourceUrl;

            return (
              <article key={post.id ?? post.slug} className="group flex flex-col">
                <Link
                  href={href}
                  className="flex h-full flex-col rounded-[32px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f4cda] focus-visible:ring-offset-4"
                >
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[32px] bg-slate-100">
                    {image ? (
                      <Image
                        src={image}
                        alt={post.featuredImage?.node?.altText || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EAE9F8] via-[#F4E3EC] to-[#FCE2E3]">
                        <span className="text-sm font-bold tracking-[0.14em] text-slate-500 uppercase">
                          Metropolitan
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="mb-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{formatDate(post.date)}</span>
                  </p>

                  <h3 className="text-xl leading-snug font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#0f4cda]">
                    <WPText html={post.title} />
                  </h3>
                </Link>

                {post.excerpt ? (
                  /* Raw WordPress excerpt HTML — parsed, with any "Continue reading" <a> turned into <Link>. */
                  <WPContent
                    html={post.excerpt}
                    className="mt-3 line-clamp-3 text-sm leading-relaxed font-medium text-slate-500"
                  />
                ) : null}

                <Link
                  href={href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#0f4cda] transition-colors duration-200 hover:text-[#0c3cb0]"
                >
                  <span>Read article</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { getClient } from "@/lib/apollo-client";
import { WPContent, WPText } from "@/components/common/WPContent";
import { gql } from "@apollo/client";

// Revalidate every hour
export const revalidate = 3600;

const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      databaseId
      slug
      title
      content
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
`;

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

export async function generateStaticParams() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await getClient().query<any>({
      query: GET_ALL_POSTS,
      context: { fetchOptions: { next: { tags: ["posts"] } } },
    });
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data?.posts?.nodes?.map((post: any) => ({
      slug: post.slug,
    })) || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await getClient().query<any>({
      query: GET_POST_BY_SLUG,
      variables: { id: slug, idType: "SLUG" },
    });
    const post = data?.post;
    if (!post) return { title: "Post Not Found" };
    return {
      title: `${post.title} | Metropolitan Health Blog`,
      description: "Read the latest health insights and medical news.",
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await getClient().query<any>({
      query: GET_POST_BY_SLUG,
      variables: { id: slug, idType: "SLUG" },
      context: { fetchOptions: { next: { revalidate: 3600, tags: ["posts"] } } },
    });
    post = data?.post;
  } catch (error) {
    console.error("Error fetching post:", error);
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 py-12 sm:py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12 space-y-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
            <WPText html={post.title} />
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author?.node?.name || "Metropolitan Health"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-lg">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              preload
            />
          </div>
        )}

        {/* Post Content: raw Gutenberg HTML parsed into React, internal links become <Link> */}
        <WPContent
          html={post.content}
          className="prose prose-slate dark:prose-invert prose-lg md:prose-xl max-w-none"
        />
      </article>
    </div>
  );
}

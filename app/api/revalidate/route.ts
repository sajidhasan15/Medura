import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * On-Demand Cache Invalidation Route for Headless WordPress
 * Call this from WordPress Webhooks (e.g. WP Webhooks or post transition actions)
 * Example: POST /api/revalidate?secret=XYZ&tag=doctors
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const tag = req.nextUrl.searchParams.get("tag");

  if (secret !== process.env.WORDPRESS_REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid revalidation secret" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: "Missing 'tag' parameter" }, { status: 400 });
  }

  try {
    revalidateTag(tag, "default");
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating cache tag", error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

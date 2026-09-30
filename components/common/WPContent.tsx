import Link from "next/link";
import parse, {
  Element,
  domToReact,
  type DOMNode,
  type HTMLReactParserOptions,
} from "html-react-parser";

/**
 * Server-safe renderer for raw HTML that comes from WordPress (Gutenberg blocks).
 *
 * Why this exists:
 * - `dangerouslySetInnerHTML` renders plain `<a>` tags, which force a full document
 *   reload for internal links and lose Next.js prefetching/client-side transitions.
 * - Here every anchor is parsed and re-hydrated as a Next.js `<Link>` when it points to
 *   this application, while external links / `mailto:` / `tel:` / in-page anchors stay
 *   as native anchors (they must, for correct browser + `rel` semantics).
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "";

/** Schemes that can never be resolved by the Next.js router. */
const NON_ROUTABLE_SCHEMES = ["mailto:", "tel:", "sms:", "callto:"];

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/** Hosts that belong to this application (frontend origin + headless WordPress origin). */
const INTERNAL_HOSTNAMES = new Set(
  [hostnameOf(SITE_URL), hostnameOf(WP_API_URL)].filter(
    (hostname): hostname is string => Boolean(hostname)
  )
);

/** True when an href can be handled by the Next.js router (client-side navigation). */
export function isInternalHref(href: string): boolean {
  const value = (href || "").trim();

  if (!value) return false;
  // In-page anchors and query-only links stay on the current document.
  if (value.startsWith("#") || value.startsWith("?")) return false;
  if (NON_ROUTABLE_SCHEMES.some((scheme) => value.toLowerCase().startsWith(scheme))) {
    return false;
  }
  // Protocol-relative URL, e.g. //api.example.com/foo
  if (value.startsWith("//")) {
    const hostname = hostnameOf(`https:${value}`);
    return hostname ? INTERNAL_HOSTNAMES.has(hostname) : false;
  }
  // Root-relative path, e.g. /posts/hello-world
  if (value.startsWith("/")) return true;
  // Absolute URL with an explicit scheme.
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    const hostname = hostnameOf(value);
    return hostname ? INTERNAL_HOSTNAMES.has(hostname) : false;
  }
  // Relative path, e.g. "doctors/dr-jane"
  return true;
}

/** Converts an internal absolute URL into a router path (`/path?query#hash`). */
export function toRoutableHref(href: string): string {
  const value = (href || "").trim();

  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value, SITE_URL);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return value;
  }
}

function buildOptions(
  resolveHref?: (href: string) => string
): HTMLReactParserOptions {
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      // Only element nodes can carry attributes we want to rewrite.
      if (!(domNode instanceof Element)) return;

      if (domNode.name === "a") {
        const attribs = domNode.attribs ?? {};
        const href = (attribs.href ?? "").trim();

        // Anchors without a usable href are rendered untouched.
        if (!href) return;

        const className = attribs.class;
        const title = attribs.title;
        const id = attribs.id;
        const ariaLabel = attribs["aria-label"];
        const content = domToReact(domNode.children as DOMNode[], options);

        if (isInternalHref(href)) {
          return (
            <Link
              href={(resolveHref ?? toRoutableHref)(href)}
              className={className}
              title={title}
              id={id}
              aria-label={ariaLabel}
            >
              {content}
            </Link>
          );
        }

        // Absolute external links open in a new tab with safe rel attributes.
        if (/^https?:/i.test(href) || href.startsWith("//")) {
          // Preserve author intent (nofollow/sponsored) while forcing safe defaults.
          const rel = Array.from(
            new Set([...(attribs.rel ?? "").split(/\s+/), "noopener", "noreferrer"])
          )
            .filter(Boolean)
            .join(" ");

          return (
            <a
              href={href}
              className={className}
              title={title}
              id={id}
              aria-label={ariaLabel}
              target="_blank"
              rel={rel}
            >
              {content}
            </a>
          );
        }

        // mailto:, tel: and in-page anchors.
        return (
          <a href={href} className={className} title={title} id={id} aria-label={ariaLabel}>
            {content}
          </a>
        );
      }

      return;
    },
  };

  return options;
}

export interface WPContentProps {
  /** Raw HTML string coming from WPGraphQL (post/page content, FAQ answers, excerpts...). */
  html?: string | null;
  /** Wrapper classes — the WordPress block styles are scoped through `.wp-content`. */
  className?: string;
  /** Optional rewrite hook to map WordPress permalinks onto frontend routes. */
  resolveHref?: (href: string) => string;
}

/** Renders WordPress HTML with Gutenberg block classes preserved and internal links as `<Link>`. */
export function WPContent({ html, className, resolveHref }: WPContentProps) {
  if (!html) return null;

  const parsed = parse(html, buildOptions(resolveHref));

  return <div className={["wp-content", className].filter(Boolean).join(" ")}>{parsed}</div>;
}

/**
 * Renders WordPress HTML as inline text — used for titles/excerpts that contain
 * HTML entities (e.g. `&#8217;`) but should not produce block level markup.
 */
export function WPText({ html, className }: { html?: string | null; className?: string }) {
  if (!html) return null;

  const parsed = parse(html, { trim: true });

  return <span className={className}>{parsed}</span>;
}

export default WPContent;

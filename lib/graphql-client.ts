/**
 * Enterprise WPGraphQL Client for Next.js App Router
 *
 * Designed for sub-100ms load times leveraging Next.js native Data Cache,
 * ISR (Incremental Static Regeneration), and On-Demand Tag Revalidation.
 */

export class WPGraphQLError extends Error {
  public errors: Array<{ message: string; locations?: unknown[]; path?: unknown[] }>;
  public status?: number;

  constructor(
    message: string,
    errors: Array<{ message: string; locations?: unknown[]; path?: unknown[] }> = [],
    status?: number
  ) {
    super(message);
    this.name = "WPGraphQLError";
    this.errors = errors;
    this.status = status;
  }
}

export interface GraphQLFetchOptions<TVariables = Record<string, unknown>> {
  query: string;
  variables?: TVariables;
  /**
   * Revalidation interval in seconds.
   * Default: 3600 (1 hour). Set to 0 or 'no-store' for dynamic real-time queries.
   */
  revalidate?: number | false;
  /**
   * Next.js cache tags for On-Demand Revalidation (e.g., ['doctors', 'departments']).
   */
  tags?: string[];
  /**
   * Fetch cache strategy ('force-cache' | 'no-store').
   */
  cache?: RequestCache;
  /**
   * Optional Bearer token or WordPress Application Password for authenticated queries/mutations.
   */
  authToken?: string;
  /**
   * Request timeout in milliseconds (default: 10000ms).
   */
  timeoutMs?: number;
}

interface GraphQLResponse<TData> {
  data?: TData;
  errors?: Array<{
    message: string;
    locations?: unknown[];
    path?: unknown[];
  }>;
}

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "https://api.sajidhasan.dev/graphql";

/**
 * Centralized GraphQL fetcher with Next.js App Router caching support.
 *
 * @template TData Expected shape of `response.data`
 * @template TVariables Expected shape of query variables
 */
export async function fetchGraphQL<TData, TVariables = Record<string, unknown>>({
  query,
  variables,
  revalidate = 3600,
  tags = [],
  cache,
  authToken,
  timeoutMs = 10000,
}: GraphQLFetchOptions<TVariables>): Promise<TData> {
  if (!GRAPHQL_ENDPOINT) {
    throw new Error(
      "NEXT_PUBLIC_WORDPRESS_API_URL is not configured. Please define it in your environment variables."
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Attach auth token if provided or use server-side private auth token
  const token = authToken || process.env.WORDPRESS_AUTH_TOKEN;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Configure Next.js caching directives
  const nextOptions: { revalidate?: number | false; tags?: string[] } = {};

  if (cache === "no-store" || revalidate === 0) {
    nextOptions.revalidate = 0;
  } else {
    if (typeof revalidate === "number" || revalidate === false) {
      nextOptions.revalidate = revalidate;
    }
    if (tags.length > 0) {
      nextOptions.tags = tags;
    }
  }

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      signal: controller.signal,
      cache: cache || (revalidate === 0 ? "no-store" : "default"),
      next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
    });

    if (!response.ok) {
      throw new WPGraphQLError(
        `WPGraphQL request failed with HTTP ${response.status}: ${response.statusText}`,
        [],
        response.status
      );
    }

    const json: GraphQLResponse<TData> = await response.json();

    if (json.errors && json.errors.length > 0) {
      const errorMessages = json.errors.map((e) => e.message).join(" | ");
      throw new WPGraphQLError(
        `WPGraphQL Error: ${errorMessages}`,
        json.errors,
        response.status
      );
    }

    if (!json.data) {
      throw new WPGraphQLError("WPGraphQL returned an empty data payload.", [], response.status);
    }

    return json.data;
  } catch (error: unknown) {
    if (error instanceof WPGraphQLError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new WPGraphQLError(
        `WPGraphQL request timed out after ${timeoutMs}ms for query: ${query.slice(0, 80)}...`
      );
    }

    throw new WPGraphQLError(
      `Network error fetching from WPGraphQL: ${error instanceof Error ? error.message : String(error)}`
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Standard WPGraphQL Connection & Node Types
 */

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

export interface Edge<T> {
  cursor: string;
  node: T;
}

export interface WPConnection<T> {
  pageInfo: PageInfo;
  edges: Edge<T>[];
  nodes: T[];
}

export interface FeaturedImageNode {
  node: {
    sourceUrl: string;
    altText?: string;
    mediaDetails?: {
      width?: number;
      height?: number;
    };
  };
}

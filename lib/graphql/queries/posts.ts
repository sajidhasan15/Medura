import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";

export const GET_LATEST_POSTS_QUERY = gql`
  query GetLatestPosts($first: Int = 3) {
    posts(first: $first) {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export async function getLatestPosts(first = 3) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await getClient().query<any>({
      query: GET_LATEST_POSTS_QUERY,
      variables: { first },
      context: {
        fetchOptions: {
          next: { revalidate: 3600, tags: ["posts"] },
        },
      },
    });

    return data?.posts?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching posts via Apollo:", error);
    return [];
  }
}

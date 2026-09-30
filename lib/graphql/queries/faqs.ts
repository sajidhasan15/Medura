import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { GetFAQsResponse, FAQ } from "@/types/entities";

export const GET_FAQS_QUERY = gql`
  query GetFAQs($first: Int = 100) {
    faqs(first: $first) {
      nodes {
        id
        databaseId
        title
        content
        faqCategory {
          nodes {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const { data } = await getClient().query<GetFAQsResponse>({
      query: GET_FAQS_QUERY,
      context: {
        fetchOptions: {
          next: { revalidate: 86400, tags: ["faqs"] },
        },
      },
    });

    return data?.faqs?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching FAQs via Apollo:", error);
    return [];
  }
}

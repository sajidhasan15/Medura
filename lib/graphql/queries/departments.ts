import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { GetDepartmentsResponse, Department } from "@/types/entities";

export const GET_DEPARTMENTS_QUERY = gql`
  query GetDepartments($first: Int = 100) {
    departments(first: $first) {
      nodes {
        id
        databaseId
        slug
        name
        description
      }
    }
  }
`;

export async function getDepartments(): Promise<Department[]> {
  try {
    const { data } = await getClient().query<GetDepartmentsResponse>({
      query: GET_DEPARTMENTS_QUERY,
      context: {
        fetchOptions: {
          next: { revalidate: 86400, tags: ["departments"] },
        },
      },
    });

    return data?.departments?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching departments via Apollo:", error);
    return [];
  }
}

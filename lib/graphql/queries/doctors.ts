import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { GetDoctorsResponse, GetDoctorBySlugResponse, Doctor } from "@/types/entities";

export const GET_DOCTORS_QUERY = gql`
  query GetDoctors($first: Int = 50, $after: String) {
    doctors(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        slug
        title
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        doctorDetails {
          specialty
          qualifications
          experienceYears
          consultationFee
          availableDays
          availableHours
          roomNumber
          rating
        }
        departments {
          nodes {
            id
            slug
            name
          }
        }
      }
    }
  }
`;

export const GET_DOCTOR_BY_SLUG_QUERY = gql`
  query GetDoctorBySlug($slug: ID!) {
    doctor(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      doctorDetails {
        specialty
        qualifications
        experienceYears
        consultationFee
        availableDays
        availableHours
        roomNumber
        rating
      }
      departments {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
`;

/**
 * Fetch list of doctors with Next.js ISR tag 'doctors'
 */
export async function getDoctors(first = 50): Promise<Doctor[]> {
  try {
    const { data } = await getClient().query<GetDoctorsResponse>({
      query: GET_DOCTORS_QUERY,
      variables: { first },
      context: {
        fetchOptions: {
          next: { revalidate: 3600, tags: ["doctors"] },
        },
      },
    });

    return data?.doctors?.nodes ?? [];
  } catch (error) {
    console.error("Error fetching doctors via Apollo:", error);
    return [];
  }
}

/**
 * Fetch a single doctor by slug
 */
export async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  try {
    const { data } = await getClient().query<GetDoctorBySlugResponse>({
      query: GET_DOCTOR_BY_SLUG_QUERY,
      variables: { slug },
      context: {
        fetchOptions: {
          next: { revalidate: 3600, tags: ["doctors", `doctor-${slug}`] },
        },
      },
    });

    return data?.doctor ?? null;
  } catch (error) {
    console.error(`Error fetching doctor ${slug} via Apollo:`, error);
    return null;
  }
}

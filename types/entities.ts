import { FeaturedImageNode, WPConnection } from "./graphql";

/**
 * Department entity
 */
export interface Department {
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  description?: string;
  iconName?: string;
  headOfDepartment?: string;
}

/**
 * Doctor Custom Post Type (CPT) entity
 */
export interface Doctor {
  id: string;
  databaseId: number;
  slug: string;
  title: string; // Doctor name (e.g., "Dr. Jane Smith, MD")
  content?: string; // Bio / Curriculum Vitae
  featuredImage?: FeaturedImageNode;
  doctorDetails?: {
    specialty?: string;
    qualifications?: string;
    experienceYears?: number;
    consultationFee?: number;
    availableDays?: string[];
    availableHours?: string;
    roomNumber?: string;
    rating?: number;
  };
  departments?: {
    nodes: Department[];
  };
}

/**
 * FAQ entity
 */
export interface FAQ {
  id: string;
  databaseId: number;
  title: string; // Question
  content: string; // Answer (HTML from WP)
  faqCategory?: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
}

/**
 * Appointment booking input & response
 */
export interface AppointmentInput {
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:30 AM"
  departmentId?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  appointmentNumber: string;
  doctor: Pick<Doctor, "id" | "title">;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  timeSlot: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
}

// WPGraphQL query response root types
export interface GetDoctorsResponse {
  doctors: WPConnection<Doctor>;
}

export interface GetDoctorBySlugResponse {
  doctor: Doctor | null;
}

export interface GetDepartmentsResponse {
  departments: WPConnection<Department>;
}

export interface GetFAQsResponse {
  faqs: WPConnection<FAQ>;
}

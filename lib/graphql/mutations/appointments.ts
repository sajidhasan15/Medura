import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo-client";
import { AppointmentInput, Appointment } from "@/types/entities";

export const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      appointment {
        id
        appointmentNumber
        date
        timeSlot
        status
        patientName
        patientEmail
        patientPhone
        doctor {
          id
          title
        }
      }
    }
  }
`;

interface CreateAppointmentResponse {
  createAppointment: {
    appointment: Appointment;
  };
}

/**
 * Mutation to book an appointment (never cached)
 */
export async function createAppointment(input: AppointmentInput): Promise<Appointment> {
  const { data } = await getClient().mutate<CreateAppointmentResponse>({
    mutation: CREATE_APPOINTMENT_MUTATION,
    variables: { input },
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  if (!data?.createAppointment?.appointment) {
    throw new Error("Failed to create appointment.");
  }

  return data.createAppointment.appointment;
}

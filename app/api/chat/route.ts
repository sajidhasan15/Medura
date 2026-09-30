import { NextRequest, NextResponse } from "next/server";
import { getDoctors } from "@/lib/graphql/queries/doctors";
import { createAppointment } from "@/lib/graphql/mutations/appointments";
import { AppointmentInput } from "@/types/entities";

/**
 * Tool definitions exposed to Claude AI
 */
const CLAUDE_TOOLS = [
  {
    name: "search_doctors",
    description: "Search for doctors by department, specialty, or condition.",
    input_schema: {
      type: "object",
      properties: {
        specialty: {
          type: "string",
          description: "Medical specialty (e.g., Cardiology, Neurology, Pediatrics).",
        },
        searchQuery: {
          type: "string",
          description: "Free-text keywords for symptoms or doctor names.",
        },
      },
    },
  },
  {
    name: "book_appointment",
    description: "Book an appointment for a patient with a designated doctor.",
    input_schema: {
      type: "object",
      required: ["doctorId", "patientName", "patientEmail", "patientPhone", "date", "timeSlot"],
      properties: {
        doctorId: { type: "string", description: "The GraphQL ID or database ID of the doctor." },
        patientName: { type: "string", description: "Full name of the patient." },
        patientEmail: { type: "string", description: "Email address of the patient." },
        patientPhone: { type: "string", description: "Phone number of the patient." },
        date: { type: "string", description: "Date of appointment in YYYY-MM-DD format." },
        timeSlot: { type: "string", description: "Preferred slot, e.g. '10:00 AM'." },
        notes: { type: "string", description: "Optional symptoms or consultation notes." },
      },
    },
  },
];

const SYSTEM_PROMPT = `
You are the intelligent triage and appointment booking assistant for Metropolitan Health System.
You help patients find the right specialist, understand hospital departments, and book appointments.
Maintain a polite, reassuring, professional, and HIPAA-conscious tone.
Always advise patients that for immediate medical emergencies, they must call 911 or visit the emergency room.
When recommending doctors or booking an appointment, invoke the relevant tool call.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not configured in the environment." },
        { status: 500 }
      );
    }

    // Call Anthropic API with Tool Calling enabled
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
        tools: CLAUDE_TOOLS,
      }),
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      return NextResponse.json(
        { error: `Anthropic API error: ${anthropicResponse.statusText}`, details: errorText },
        { status: anthropicResponse.status }
      );
    }

    const data = await anthropicResponse.json();

    // Check if Claude requested a tool execution
    const toolUseBlock = data.content?.find(
      (block: { type: string }) => block.type === "tool_use"
    );

    if (toolUseBlock) {
      let toolResult: unknown = null;

      if (toolUseBlock.name === "search_doctors") {
        const allDoctors = await getDoctors(50);
        const { specialty, searchQuery } = toolUseBlock.input as {
          specialty?: string;
          searchQuery?: string;
        };

        toolResult = allDoctors.filter((doc) => {
          const matchSpecialty = specialty
            ? doc.doctorDetails?.specialty?.toLowerCase().includes(specialty.toLowerCase())
            : true;
          const matchQuery = searchQuery
            ? doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              doc.content?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
          return matchSpecialty && matchQuery;
        });
      } else if (toolUseBlock.name === "book_appointment") {
        toolResult = await createAppointment(toolUseBlock.input as AppointmentInput);
      }

      return NextResponse.json({
        message: data,
        toolExecuted: {
          name: toolUseBlock.name,
          input: toolUseBlock.input,
          result: toolResult,
        },
      });
    }

    return NextResponse.json({ message: data });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

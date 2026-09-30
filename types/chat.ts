/**
 * Claude AI Chat & Tool Calling Interfaces
 */

export type ChatRole = "user" | "assistant" | "system";

export interface ToolCall {
  id: string;
  name: "search_doctors" | "check_doctor_availability" | "create_appointment";
  input: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  toolCalls?: ToolCall[];
  createdAt?: string;
}

export interface ChatRequestBody {
  messages: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface DoctorSearchFilter {
  specialty?: string;
  departmentSlug?: string;
  query?: string;
}

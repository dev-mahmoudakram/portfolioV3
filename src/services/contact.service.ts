import type { ContactPayload } from "@/types";
import { apiFetch } from "@/lib/api";

interface ContactResponse {
  ok: boolean;
  message: string;
}

export function sendContactMessage(payload: ContactPayload) {
  return apiFetch<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

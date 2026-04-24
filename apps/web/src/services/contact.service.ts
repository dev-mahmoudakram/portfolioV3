import type { ContactMessage, ContactPayload } from "@mahmoud-portfolio/types";
import { apiFetch } from "@/lib/api";

interface ContactResponse {
  ok: boolean;
  message: string;
  data: ContactMessage;
}

export function sendContactMessage(payload: ContactPayload) {
  return apiFetch<ContactResponse>("/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

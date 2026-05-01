import { Resend } from "resend";

interface LeadNotificationInput {
  parentFirstName: string;
  email: string;
  childAge: string;
  city?: string;
  quizScore: number;
  archetype: string;
  compatibilityStars: number;
  topTags: string[];
}

export async function sendLeadNotification(input: LeadNotificationInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.LEAD_NOTIFICATION_TO;

  if (!apiKey || !from || !to) {
    return { skipped: true } as const;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: `New Kingdom West Montessori lead: ${input.parentFirstName}`,
    html: `
      <div style="font-family: Inter, Arial, sans-serif; color: #193d35; line-height: 1.6;">
        <h2 style="margin-bottom: 16px;">New Montessori quiz lead</h2>
        <p><strong>Parent first name:</strong> ${escapeHtml(input.parentFirstName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Child age:</strong> ${escapeHtml(input.childAge)}</p>
        <p><strong>City/Suburb:</strong> ${escapeHtml(input.city || "Not provided")}</p>
        <p><strong>Quiz score:</strong> ${input.quizScore}</p>
        <p><strong>Archetype:</strong> ${escapeHtml(input.archetype)}</p>
        <p><strong>Compatibility stars:</strong> ${input.compatibilityStars}</p>
        <p><strong>Top tags:</strong> ${escapeHtml(input.topTags.join(", "))}</p>
      </div>
    `,
  });

  return { skipped: false } as const;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

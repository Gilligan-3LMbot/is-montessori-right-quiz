import { NextResponse } from "next/server";
import { z } from "zod";

import { sendQuizStartNotification } from "@/lib/resend";

const leadStartSchema = z.object({
  parentFirstName: z.string().trim().min(1, "Please enter a parent first name."),
  email: z.string().trim().email("Please enter a valid email address."),
  childAge: z.string().trim().min(1, "Please enter your child’s age."),
  city: z.string().trim().optional().default(""),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadStartSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid lead submission." },
      { status: 400 },
    );
  }

  await sendQuizStartNotification(parsed.data).catch(() => null);

  return NextResponse.json({ ok: true });
}

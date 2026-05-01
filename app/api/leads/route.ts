import { NextResponse } from "next/server";
import { z } from "zod";

import { sendLeadNotification } from "@/lib/resend";
import { createSupabaseAdminClient } from "@/lib/supabase";

const leadSchema = z.object({
  parentFirstName: z.string().trim().min(1, "Please enter a parent first name."),
  email: z.string().trim().email("Please enter a valid email address."),
  childAge: z.string().trim().min(1, "Please enter your child’s age."),
  city: z.string().trim().optional().default(""),
  quizScore: z.number().int().min(7).max(28),
  archetype: z.string().trim().min(1),
  compatibilityStars: z.number().int().min(1).max(5),
  topTags: z.array(z.string()).min(1).max(5),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid lead submission." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Lead capture is not configured yet. Add your Supabase environment variables before collecting submissions.",
      },
      { status: 503 },
    );
  }

  const lead = {
    parent_first_name: parsed.data.parentFirstName,
    email: parsed.data.email,
    child_age: parsed.data.childAge,
    city: parsed.data.city || null,
    quiz_score: parsed.data.quizScore,
    archetype: parsed.data.archetype,
    compatibility_stars: parsed.data.compatibilityStars,
    top_tags: parsed.data.topTags,
    created_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("montessori_quiz_leads").insert(lead);

  if (error) {
    return NextResponse.json(
      { error: "We couldn’t save your information just now. Please try again." },
      { status: 500 },
    );
  }

  await sendLeadNotification({
    parentFirstName: parsed.data.parentFirstName,
    email: parsed.data.email,
    childAge: parsed.data.childAge,
    city: parsed.data.city,
    quizScore: parsed.data.quizScore,
    archetype: parsed.data.archetype,
    compatibilityStars: parsed.data.compatibilityStars,
    topTags: parsed.data.topTags,
  }).catch(() => null);

  return NextResponse.json({ ok: true });
}

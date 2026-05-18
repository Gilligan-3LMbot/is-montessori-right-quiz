"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Download, Mail, MapPin, Share2, Sparkles, Star } from "lucide-react";
import { toPng } from "html-to-image";

import {
  hasLeadFormData,
  INITIAL_LEAD_FORM,
  QUIZ_LEAD_RESULT_SUBMITTED_KEY,
  QUIZ_LEAD_STORAGE_KEY,
  type QuizLeadFormState,
} from "@/lib/lead-form";
import { calculateQuizResult, deserializeAnswers } from "@/lib/quiz";

export function ResultsView() {
  const searchParams = useSearchParams();
  const answers = deserializeAnswers(searchParams.get("answers"));
  const result = useMemo(() => (answers ? calculateQuizResult(answers) : null), [answers]);

  const cardRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState(INITIAL_LEAD_FORM);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const storedLead = useSyncExternalStore(subscribeToLeadStore, readStoredLead, () => null);
  const activeForm = hasLeadFormData(form) ? form : storedLead ?? INITIAL_LEAD_FORM;
  const alreadySubmitted = useSyncExternalStore(subscribeToLeadStore, readSubmittedFlag, () => false);

  async function handleDownloadCard() {
    if (!cardRef.current || !result) {
      return;
    }

    const currentArchetype = result.archetype;

    const dataUrl = await toPng(cardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#243f39",
    });

    const link = document.createElement("a");
    link.download = `${currentArchetype.key}-montessori-result-card.png`;
    link.href = dataUrl;
    link.click();
    setActionMessage("Result card downloaded.");
  }

  async function handleShareResult() {
    if (!cardRef.current || !result) {
      return;
    }

    const currentArchetype = result.archetype;

    const currentUrl = window.location.href;
    const shareText = `My child’s Montessori learner type is ${currentArchetype.title}. ${currentArchetype.personalitySentence}`;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#243f39",
      });

      const blob = await fetch(dataUrl).then((response) => response.blob());
      const file = new File([blob], `${currentArchetype.key}-montessori-result-card.png`, {
        type: "image/png",
      });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Is Montessori Right for My Child?",
          text: shareText,
          url: currentUrl,
          files: [file],
        });
        setActionMessage("Result shared.");
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Is Montessori Right for My Child?",
          text: shareText,
          url: currentUrl,
        });
        setActionMessage("Result shared.");
        return;
      }

      await navigator.clipboard.writeText(currentUrl);
      setActionMessage("Share isn’t available here, so I copied your results link instead.");
    } catch {
      setActionMessage("Sharing was canceled or unavailable.");
    }
  }

  async function handleCopyQuizLink() {
    const link = `${window.location.origin}/`;
    await navigator.clipboard.writeText(link);
    setActionMessage("Quiz link copied.");
  }

  async function submitLead(leadForm: QuizLeadFormState, options?: { auto?: boolean }) {
    if (!result) {
      return;
    }

    setFormState("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          quizScore: result.score,
          archetype: result.archetype.title,
          compatibilityStars: result.archetype.compatibilityStars,
          topTags: result.topTags,
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Something went wrong while saving your interest.");
      }

      window.sessionStorage.setItem(QUIZ_LEAD_RESULT_SUBMITTED_KEY, "true");
      setFormState("success");
      setFormMessage(
        options?.auto
          ? "Your result and follow-up details have been sent."
          : "Thank you! We’ll send a few thoughtful next steps and future updates soon.",
      );
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving your interest.",
      );
    }
  }

  async function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitLead(activeForm);
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8f3e9,_#f2ecdf_35%,_#ebe1d1_100%)] px-5 py-12 text-[#203833] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/70 bg-white/90 p-8 text-center shadow-[0_24px_60px_rgba(36,63,57,0.12)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">Quiz results</p>
          <h1 className="mt-4 font-[family:var(--font-display)] text-4xl">We need your quiz answers first.</h1>
          <p className="mt-4 text-lg leading-8 text-[#5c746d]">
            Start with the seven questions, then we’ll turn your answers into a personalized Montessori learner profile.
          </p>
          <Link
            href="/quiz"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,_#3b5c53,_#243f39)] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(36,63,57,0.24)]"
          >
            Start the quiz
          </Link>
        </div>
      </div>
    );
  }

  const resultData = result;
  const { archetype } = resultData;
  const compatibilityLabel =
    archetype.compatibilityStars >= 5
      ? "Excellent Montessori alignment"
      : archetype.compatibilityStars === 4
        ? "Strong Montessori potential"
        : "Promising with the right support";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8f3e9,_#f2ecdf_35%,_#ebe1d1_100%)] px-5 py-8 text-[#203833] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#59736b]">
          <Link href="/quiz" className="font-medium hover:text-[#183b35]">
            Retake the quiz
          </Link>
          <p>
            Score: <span className="font-semibold text-[#183b35]">{resultData.score} / 28</span>
          </p>
        </div>

        <div className="overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/92 shadow-[0_28px_80px_rgba(36,63,57,0.14)]">
          <section className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background: `radial-gradient(circle at top right, ${archetype.accent.glow}, transparent 35%), linear-gradient(180deg, #fffaf2 0%, #fff 100%)`,
              }}
            />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">Archetype result</p>
              <div className="mt-4 flex flex-wrap items-end gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#edf2ef] px-4 py-2 text-sm font-medium text-[#35544b]">
                    <Sparkles className="h-4 w-4" />
                    {archetype.emoji} {archetype.title}
                  </div>
                  <h1 className="mt-5 font-[family:var(--font-display)] text-4xl leading-tight text-[#183b35] sm:text-5xl">
                    Your child’s Montessori learner type is {archetype.title}.
                  </h1>
                </div>
              </div>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#526d65]">
                {archetype.resultDescription}
              </p>
            </div>
          </section>

          <section className="border-t border-[#efe5d4] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">Personalized insight</p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#415c55]">{resultData.personalizedInsight}</p>
            {resultData.dominantTraitLabels.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {resultData.dominantTraitLabels.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full bg-[#f3ead8] px-3 py-1 text-sm font-medium text-[#7b6337]"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            ) : null}
          </section>

          <section className="border-t border-[#efe5d4] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">
              Montessori compatibility
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-[#d5b06a]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-7 w-7 ${
                      index < archetype.compatibilityStars ? "fill-current" : "text-[#e2d7bc]"
                    }`}
                  />
                ))}
              </div>
              <div>
                <p className="text-xl font-semibold text-[#183b35]">{compatibilityLabel}</p>
                <p className="text-sm text-[#5c746d]">{archetype.compatibilityStars} out of 5 stars</p>
              </div>
            </div>
          </section>

          <section className="border-t border-[#efe5d4] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">
              Montessori could be a great fit if…
            </p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[#415c55] sm:text-lg">
              {archetype.fitIf.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#35544b]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-[#efe5d4] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">
              What to look for in a classroom
            </p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[#415c55] sm:text-lg">
              {resultData.classroomBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#d5b06a]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#5a736c]">
              A child’s success in Montessori isn’t just about their personality—it’s about the environment, the guide, and how well the classroom meets them where they are.
            </p>
          </section>

          <section className="border-t border-[#efe5d4] bg-[#fcf8f0] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">
              Follow-up captured
            </p>
            <h2 className="mt-4 font-[family:var(--font-display)] text-3xl text-[#203833] sm:text-4xl">
              Your result is being sent with your contact details.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#4f6961] sm:text-lg">
              Because you entered your details before starting, this result can be delivered without another signup step.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#4f6961] sm:text-lg">
              If someone lands here without going through the quiz start gate first, they can still submit the form below manually.
            </p>

            {formState === "success" || alreadySubmitted ? (
              <div className="mt-6 rounded-[1.5rem] border border-[#d4e0d9] bg-[#eef5f1] p-5 text-base leading-7 text-[#35544b]">
                {formMessage || "Your result and follow-up details have already been sent."}
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">Parent first name</span>
                  <input
                    required
                    value={activeForm.parentFirstName}
                    onChange={(event) => setForm({ ...activeForm, parentFirstName: event.target.value })}
                    className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white px-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">Email address</span>
                  <input
                    required
                    type="email"
                    value={activeForm.email}
                    onChange={(event) => setForm({ ...activeForm, email: event.target.value })}
                    className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white px-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">Child’s age</span>
                  <input
                    required
                    value={activeForm.childAge}
                    onChange={(event) => setForm({ ...activeForm, childAge: event.target.value })}
                    className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white px-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                    placeholder="For example: 4"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">City/Suburb (optional)</span>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b08b4f]" />
                    <input
                      value={activeForm.city}
                      onChange={(event) => setForm({ ...activeForm, city: event.target.value })}
                      className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white pl-11 pr-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                    />
                  </div>
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,_#3b5c53,_#243f39)] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(36,63,57,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Mail className="h-4 w-4" />
                    {formState === "submitting"
                      ? "Saving your information..."
                      : "Get Updates and Next Steps"}
                  </button>
                </div>
                {formMessage ? (
                  <p
                    className={`sm:col-span-2 text-sm ${
                      formState === "error" ? "text-[#9d4b3a]" : "text-[#35544b]"
                    }`}
                  >
                    {formMessage}
                  </p>
                ) : null}
              </form>
            )}
          </section>

          <section className="border-t border-[#efe5d4] px-6 py-8 sm:px-8 lg:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">Shareable result card</p>
            <div className="mt-6 rounded-[2rem] bg-[#243f39] p-3 shadow-[0_24px_64px_rgba(36,63,57,0.22)] sm:p-4">
              <div
                ref={cardRef}
                className="overflow-hidden rounded-[1.75rem]"
                style={{
                  background: `linear-gradient(145deg, ${archetype.accent.from}, ${archetype.accent.to})`,
                }}
              >
                <div className="relative overflow-hidden px-6 py-7 text-[#fff8eb] sm:px-8 sm:py-8">
                  <div
                    className="absolute -right-12 top-0 h-40 w-40 rounded-full"
                    style={{ background: archetype.accent.glow, filter: "blur(8px)" }}
                  />
                  <div className="relative rounded-[1.5rem] border border-white/12 bg-[#fcf7ee] p-6 text-[#203833]">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b08b4f]">
                      My child’s Montessori learner type is...
                    </p>
                    <h3 className="mt-4 font-[family:var(--font-display)] text-4xl leading-tight">
                      My child is a {archetype.title} {archetype.emoji}
                    </h3>
                    <p className="mt-4 text-lg leading-8 text-[#48635c]">
                      {archetype.personalitySentence}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-[#d5b06a]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < archetype.compatibilityStars ? "fill-current" : "text-[#e2d7bc]"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-[#7b6337]">
                        Montessori compatibility: {archetype.compatibilityStars}/5
                      </span>
                    </div>
                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#eadfc7] pt-5 text-sm text-[#64766e]">
                      <div>
                        <p className="font-semibold text-[#203833]">Personalized learner profile</p>
                        <p>Warm, thoughtful classroom-fit insight</p>
                      </div>
                      <p className="max-w-[170px] text-right">
                        Take the quiz: Is Montessori Right for My Child?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-[#efe5d4] px-6 py-8 sm:px-8 lg:px-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleDownloadCard}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d7c7ad] bg-white px-5 text-sm font-semibold text-[#28443d] transition hover:-translate-y-0.5 hover:border-[#d5b06a]"
              >
                <Download className="h-4 w-4" />
                Download Result Card
              </button>
              <button
                type="button"
                onClick={handleShareResult}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,_#3b5c53,_#243f39)] px-5 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(36,63,57,0.18)] transition hover:-translate-y-0.5"
              >
                <Share2 className="h-4 w-4" />
                Share Result
              </button>
              <button
                type="button"
                onClick={handleCopyQuizLink}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#d7c7ad] bg-[#fcf8f0] px-5 text-sm font-semibold text-[#28443d] transition hover:-translate-y-0.5 hover:border-[#d5b06a]"
              >
                <Copy className="h-4 w-4" />
                Copy Quiz Link
              </button>
            </div>
            {actionMessage ? <p className="mt-4 text-sm text-[#5d756d]">{actionMessage}</p> : null}
          </section>
        </div>
      </div>
    </div>
  );
}

function readStoredLead() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedLead = window.sessionStorage.getItem(QUIZ_LEAD_STORAGE_KEY);

  if (!storedLead) {
    return null;
  }

  try {
    return JSON.parse(storedLead) as QuizLeadFormState;
  } catch {
    window.sessionStorage.removeItem(QUIZ_LEAD_STORAGE_KEY);
    return null;
  }
}

function readSubmittedFlag() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(QUIZ_LEAD_RESULT_SUBMITTED_KEY) === "true";
}

function subscribeToLeadStore() {
  return () => {};
}

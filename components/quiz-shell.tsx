"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Leaf, Mail, MapPin } from "lucide-react";

import {
  hasLeadFormData,
  INITIAL_LEAD_FORM,
  QUIZ_LEAD_RESULT_SUBMITTED_KEY,
  QUIZ_LEAD_STORAGE_KEY,
} from "@/lib/lead-form";
import { calculateQuizResult, QUESTIONS, type AnswerId, serializeAnswers } from "@/lib/quiz";

const EMPTY_ANSWERS = Array.from({ length: QUESTIONS.length }, () => "") as Array<
  AnswerId | ""
>;

export function QuizShell() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Array<AnswerId | "">>(EMPTY_ANSWERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [leadForm, setLeadForm] = useState(INITIAL_LEAD_FORM);
  const [leadFormState, setLeadFormState] = useState<"idle" | "submitting" | "error">("idle");
  const [leadFormMessage, setLeadFormMessage] = useState("");

  const storedLead = useSyncExternalStore(subscribeToLeadStore, readStoredLead, () => null);
  const activeLeadForm = hasLeadFormData(leadForm) ? leadForm : storedLead ?? INITIAL_LEAD_FORM;
  const hasStoredLead = Boolean(storedLead);
  const quizStarted = hasStarted || hasStoredLead;

  const currentQuestion = QUESTIONS[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const answeredCount = answers.filter(Boolean).length;
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const isComplete = useMemo(
    () => answers.every((answer): answer is AnswerId => Boolean(answer)),
    [answers],
  );

  function handleSelect(answerId: AnswerId) {
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = answerId;
      return next;
    });
  }

  function goBack() {
    setCurrentIndex((value) => Math.max(0, value - 1));
  }

  async function goNext() {
    if (!selectedAnswer) {
      return;
    }

    if (currentIndex === QUESTIONS.length - 1) {
      if (!isComplete) {
        return;
      }

      if (activeLeadForm.parentFirstName && activeLeadForm.email && activeLeadForm.childAge) {
        const quizResult = calculateQuizResult(answers as AnswerId[]);

        try {
          const response = await fetch("/api/leads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...activeLeadForm,
              quizScore: quizResult.score,
              archetype: quizResult.archetype.title,
              compatibilityStars: quizResult.archetype.compatibilityStars,
              topTags: quizResult.topTags,
            }),
          });

          if (response.ok) {
            window.sessionStorage.setItem(QUIZ_LEAD_RESULT_SUBMITTED_KEY, "true");
          } else {
            window.sessionStorage.removeItem(QUIZ_LEAD_RESULT_SUBMITTED_KEY);
          }
        } catch {
          window.sessionStorage.removeItem(QUIZ_LEAD_RESULT_SUBMITTED_KEY);
        }
      }

      router.push(`/results?answers=${serializeAnswers(answers as AnswerId[])}`);
      return;
    }

    setCurrentIndex((value) => Math.min(QUESTIONS.length - 1, value + 1));
  }

  async function handleLeadCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLeadFormState("submitting");
    setLeadFormMessage("");

    try {
      const response = await fetch("/api/leads/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activeLeadForm),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "We couldn’t save your information just now.");
      }

      window.sessionStorage.setItem(QUIZ_LEAD_STORAGE_KEY, JSON.stringify(activeLeadForm));
      window.sessionStorage.removeItem(QUIZ_LEAD_RESULT_SUBMITTED_KEY);
      setHasStarted(true);
      setLeadFormState("idle");
    } catch (error) {
      setLeadFormState("error");
      setLeadFormMessage(
        error instanceof Error ? error.message : "We couldn’t save your information just now.",
      );
    }
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7f0df,_#f6efe3_35%,_#efe6d5_100%)] text-[#183b35]">
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between text-sm text-[#4e695f]">
            <Link href="/" className="inline-flex items-center gap-2 font-medium hover:text-[#183b35]">
              <ArrowLeft className="h-4 w-4" />
              Back to intro
            </Link>
            <span>Email capture before quiz start</span>
          </div>

          <main className="flex flex-1 flex-col justify-center">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,52,46,0.12)] backdrop-blur sm:p-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eef4ef] px-3 py-1 text-sm font-medium text-[#285f53]">
                <Leaf className="h-4 w-4" />
                Start with a quick intro
              </div>

              <h1 className="font-[family:var(--font-display)] text-3xl leading-tight text-[#183b35] sm:text-4xl">
                Where should we send your child’s results?
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#556f67] sm:text-lg">
                Enter your details before the quiz starts, and we’ll send the completed result and follow-up
                next steps once you finish.
              </p>

              <form onSubmit={handleLeadCapture} className="mt-8 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">Parent first name</span>
                  <input
                    required
                    value={activeLeadForm.parentFirstName}
                    onChange={(event) =>
                      setLeadForm({ ...activeLeadForm, parentFirstName: event.target.value })
                    }
                    className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white px-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">Email address</span>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b08b4f]" />
                    <input
                      required
                      type="email"
                      value={activeLeadForm.email}
                      onChange={(event) =>
                        setLeadForm({ ...activeLeadForm, email: event.target.value })
                      }
                      className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white pl-11 pr-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                    />
                  </div>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">Child’s age</span>
                  <input
                    required
                    value={activeLeadForm.childAge}
                    onChange={(event) =>
                      setLeadForm({ ...activeLeadForm, childAge: event.target.value })
                    }
                    className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white px-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                    placeholder="For example: 4"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[#264e45]">City/Suburb (optional)</span>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b08b4f]" />
                    <input
                      value={activeLeadForm.city}
                      onChange={(event) =>
                        setLeadForm({ ...activeLeadForm, city: event.target.value })
                      }
                      className="min-h-12 w-full rounded-2xl border border-[#dfd2bb] bg-white pl-11 pr-4 text-base outline-none transition focus:border-[#35544b] focus:ring-4 focus:ring-[#35544b]/10"
                    />
                  </div>
                </label>
                <div className="sm:col-span-2 flex items-center justify-between gap-3">
                  <p className="max-w-xl text-sm leading-6 text-[#617872]">
                    This saves your contact details before the quiz starts, then sends the full result automatically
                    when you finish.
                  </p>
                  <button
                    type="submit"
                    disabled={leadFormState === "submitting"}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,_#285f53,_#183b35)] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(24,59,53,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {leadFormState === "submitting" ? "Saving..." : "Start the Quiz"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {leadFormMessage ? (
                  <p className="sm:col-span-2 text-sm text-[#9d4b3a]">{leadFormMessage}</p>
                ) : null}
              </form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f7f0df,_#f6efe3_35%,_#efe6d5_100%)] text-[#183b35]">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between text-sm text-[#4e695f]">
            <Link href="/" className="inline-flex items-center gap-2 font-medium hover:text-[#183b35]">
              <ArrowLeft className="h-4 w-4" />
              Back to intro
            </Link>
            <span>{answeredCount} of 7 answered</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/70 shadow-inner">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,_#c9a24f,_#285f53)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <main className="flex flex-1 flex-col justify-center">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(17,52,46,0.12)] backdrop-blur sm:p-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#eef4ef] px-3 py-1 text-sm font-medium text-[#285f53]">
              <Leaf className="h-4 w-4" />
              Question {currentIndex + 1} of {QUESTIONS.length}
            </div>

            <h1 className="font-[family:var(--font-display)] text-3xl leading-tight text-[#183b35] sm:text-4xl">
              {currentQuestion.prompt}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#556f67] sm:text-lg">
              Choose the answer that feels most true most of the time. There’s no perfect score here, just a clearer picture of how your child learns best.
            </p>

            <div className="mt-8 space-y-3">
              {currentQuestion.options.map((option) => {
                const isActive = selectedAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className={`group w-full rounded-[1.5rem] border px-4 py-4 text-left transition-all duration-200 sm:px-5 sm:py-5 ${
                      isActive
                        ? "border-[#285f53] bg-[#f0f7f4] shadow-[0_14px_30px_rgba(40,95,83,0.14)]"
                        : "border-[#e8dcc5] bg-[#fffdf9] hover:-translate-y-0.5 hover:border-[#d2b271] hover:shadow-[0_12px_24px_rgba(155,121,66,0.12)]"
                    }`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          isActive
                            ? "bg-[#285f53] text-white"
                            : "bg-[#f3ead6] text-[#7b6335] group-hover:bg-[#ead4a4]"
                        }`}
                      >
                        {option.id}
                      </div>
                      <div>
                        <p className="text-base leading-7 text-[#23463f] sm:text-lg">{option.text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </main>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={currentIndex === 0}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d8cab0] bg-white/80 px-5 text-sm font-semibold text-[#274f46] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!selectedAnswer || (currentIndex === QUESTIONS.length - 1 && !isComplete)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,_#285f53,_#183b35)] px-6 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(24,59,53,0.24)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentIndex === QUESTIONS.length - 1 ? "See my results" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
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
    return JSON.parse(storedLead) as typeof INITIAL_LEAD_FORM;
  } catch {
    window.sessionStorage.removeItem(QUIZ_LEAD_STORAGE_KEY);
    return null;
  }
}

function subscribeToLeadStore() {
  return () => {};
}

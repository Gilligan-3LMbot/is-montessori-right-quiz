"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";

import { QUESTIONS, type AnswerId, serializeAnswers } from "@/lib/quiz";

const EMPTY_ANSWERS = Array.from({ length: QUESTIONS.length }, () => "") as Array<
  AnswerId | ""
>;

export function QuizShell() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Array<AnswerId | "">>(EMPTY_ANSWERS);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  function goNext() {
    if (!selectedAnswer) {
      return;
    }

    if (currentIndex === QUESTIONS.length - 1) {
      if (!isComplete) {
        return;
      }

      router.push(`/results?answers=${serializeAnswers(answers as AnswerId[])}`);
      return;
    }

    setCurrentIndex((value) => Math.min(QUESTIONS.length - 1, value + 1));
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

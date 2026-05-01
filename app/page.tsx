import Link from "next/link";
import { ArrowRight, CheckCircle2, Leaf, Sparkles } from "lucide-react";

import { HeroScene } from "@/components/hero-scene";
import { ARCHETYPE_PREVIEW } from "@/lib/quiz";

const WHAT_YOU_DISCOVER = [
  "How your child approaches learning and problem-solving",
  "Whether they thrive with independence, structure, or a balance of both",
  "What motivates them, internally or externally",
  "The type of classroom environment they’re most likely to flourish in",
];

const HOW_IT_WORKS = [
  "Answer 7 simple questions about your child",
  "Discover their learner type",
  "See how well Montessori may fit their natural style",
  "Get personalized insight into what kind of classroom helps them thrive",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top,_#f8f3e9,_#f2ecdf_38%,_#ebe1d1_100%)] text-[#203833]">
      <section className="px-5 pb-14 pt-6 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_90px_rgba(36,63,57,0.12)] backdrop-blur sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#edf2ef] px-4 py-2 text-sm font-semibold text-[#35544b]">
                <Leaf className="h-4 w-4" />
                Warm, thoughtful, research-informed
              </div>
              <h1 className="mt-6 font-[family:var(--font-display)] text-5xl leading-[1.02] tracking-tight sm:text-6xl">
                Discover your child’s unique learning style.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#536d65] sm:text-xl">
                In just 2 minutes, uncover the type of learner your child is and whether a Montessori environment aligns with how they naturally learn.
              </p>
              <div className="mt-8">
                <Link
                  href="/quiz"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,_#3b5c53,_#243f39)] px-6 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(36,63,57,0.24)] transition hover:-translate-y-0.5"
                >
                  Start the Quiz
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-sm text-[#6e6650]">Takes about 2 minutes • Personalized results</p>
              </div>
            </div>

            <div className="lg:pl-4">
              <HeroScene />
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[#e7dac4] bg-[#fcf8f0] p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">
              What kind of learner is your child?
            </p>
            <p className="mt-4 text-lg leading-8 text-[#4f6961]">
              Every child approaches learning differently. This quiz helps you understand your child’s natural tendencies, so you can support them in the way they learn best.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {ARCHETYPE_PREVIEW.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-[#e7d9c1] bg-white p-5 shadow-[0_14px_28px_rgba(36,63,57,0.05)]"
              >
                <p className="text-2xl">{item.emoji}</p>
                <h2 className="mt-3 font-[family:var(--font-display)] text-2xl text-[#28443d]">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-[#587069]">{item.sentence}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-base leading-7 text-[#526d65] sm:text-lg">
            You’ll discover which one sounds most like your child and what it means for how they learn.
          </p>
        </div>
      </section>

      <section className="reveal-on-scroll px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto max-w-5xl rounded-[2.25rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(36,63,57,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">Trust + positioning</p>
              <p className="mt-4 text-lg leading-8 text-[#425d55]">
                This isn’t about putting your child in a box. It’s about understanding how they’re wired, so you can choose an environment where they can truly thrive.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f2e7cf] px-4 py-2 text-sm text-[#7b6337]">
                <Sparkles className="h-4 w-4" />
                Grounded in principles from educational psychology and child development.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#e7d9c1] bg-[#fcf7ed] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">
                Inside this quiz, you’ll get insight into:
              </p>
              <ul className="mt-5 space-y-4 text-base leading-7 text-[#4f6961]">
                {WHAT_YOU_DISCOVER.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#35544b]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#e7d9c1] bg-[#fcf8f0] p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">How it works</p>
            <ul className="mt-5 space-y-4 text-base leading-7 text-[#4f6961] sm:text-lg">
              {HOW_IT_WORKS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#35544b] text-sm font-semibold text-white">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(36,63,57,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b08b4f]">A gentle reminder</p>
            <p className="mt-5 text-lg leading-8 text-[#425d55]">
              There’s no right or wrong type of learner. Every child can thrive. The key is finding the environment that meets them where they are.
            </p>
            <p className="mt-5 text-base leading-7 text-[#5c746d]">
              If you’d like, you’ll also have the option to receive follow-up resources and thoughtful next steps at the end.
            </p>
          </div>
        </div>
      </section>

      <section className="reveal-on-scroll px-5 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/80 bg-[linear-gradient(180deg,_rgba(53,84,75,0.97),_rgba(36,63,57,0.98))] p-8 text-center text-white shadow-[0_28px_80px_rgba(36,63,57,0.22)] sm:p-10">
          <h2 className="font-[family:var(--font-display)] text-4xl leading-tight sm:text-5xl">
            Your child already has a natural way of learning. Let’s discover it.
          </h2>
          <div className="mt-8">
            <Link
              href="/quiz"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f5ecd9] px-6 text-sm font-semibold text-[#203833] transition hover:-translate-y-0.5"
            >
              Start the Quiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

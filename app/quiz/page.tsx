import type { Metadata } from "next";

import { QuizShell } from "@/components/quiz-shell";

export const metadata: Metadata = {
  title: "Quiz | Is Montessori Right for My Child?",
  description:
    "Answer seven warm, thoughtful questions to discover your child’s Montessori learner type.",
};

export default function QuizPage() {
  return <QuizShell />;
}

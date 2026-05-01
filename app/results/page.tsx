import type { Metadata } from "next";
import { Suspense } from "react";

import { ResultsView } from "@/components/results-view";

export const metadata: Metadata = {
  title: "Results | Is Montessori Right for My Child?",
  description:
    "See your child’s personalized Montessori learner type, compatibility score, and classroom guidance.",
};

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsView />
    </Suspense>
  );
}

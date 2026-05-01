export type QuizTag =
  | "focus_high"
  | "intrinsic"
  | "independent"
  | "focus_medium"
  | "structure_need_high"
  | "guided"
  | "energy_high"
  | "low_focus"
  | "autonomy_high"
  | "balanced"
  | "confident"
  | "low_confidence"
  | "novelty_seeking"
  | "order_high"
  | "resilient"
  | "avoidance"
  | "extrinsic";

export type AnswerId = "A" | "B" | "C" | "D";
export type ArchetypeKey =
  | "deep-diver"
  | "curious-explorer"
  | "balanced-learner"
  | "guided-achiever"
  | "energetic-explorer";

export interface QuizOption {
  id: AnswerId;
  text: string;
  score: number;
  tags: QuizTag[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface ArchetypeDefinition {
  key: ArchetypeKey;
  title: string;
  emoji: string;
  scoreMin: number;
  scoreMax: number;
  compatibilityStars: number;
  personalitySentence: string;
  resultDescription: string;
  fitIf: string[];
  accent: {
    from: string;
    to: string;
    glow: string;
  };
}

export const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "When your child is really engaged in something, what does it usually look like?",
    options: [
      {
        id: "A",
        text: "They get completely lost in it and don’t want to stop, even if it’s hard.",
        score: 4,
        tags: ["focus_high", "intrinsic", "independent"],
      },
      {
        id: "B",
        text: "They enjoy it, but tend to move on once it feels repetitive.",
        score: 3,
        tags: ["focus_medium"],
      },
      {
        id: "C",
        text: "They prefer when someone is guiding them through it step by step.",
        score: 2,
        tags: ["structure_need_high", "guided"],
      },
      {
        id: "D",
        text: "They bounce between things quickly and like lots of variety.",
        score: 1,
        tags: ["energy_high", "low_focus"],
      },
    ],
  },
  {
    id: "q2",
    prompt: "How does your child typically respond to instructions or structure?",
    options: [
      {
        id: "A",
        text: "They like understanding the why and doing things their own way.",
        score: 4,
        tags: ["independent", "autonomy_high"],
      },
      {
        id: "B",
        text: "They follow directions well, but still like some independence.",
        score: 3,
        tags: ["balanced"],
      },
      {
        id: "C",
        text: "They prefer clear rules and step-by-step guidance.",
        score: 2,
        tags: ["structure_need_high"],
      },
      {
        id: "D",
        text: "They resist structure and prefer total freedom.",
        score: 1,
        tags: ["energy_high", "autonomy_high"],
      },
    ],
  },
  {
    id: "q3",
    prompt: "When learning something new, your child tends to…",
    options: [
      {
        id: "A",
        text: "Want to try it themselves, even if they make mistakes.",
        score: 4,
        tags: ["independent", "confident"],
      },
      {
        id: "B",
        text: "Watch first, then try it out.",
        score: 3,
        tags: ["balanced"],
      },
      {
        id: "C",
        text: "Ask for help right away and want reassurance.",
        score: 2,
        tags: ["low_confidence", "guided"],
      },
      {
        id: "D",
        text: "Only engage if it feels fun or exciting immediately.",
        score: 1,
        tags: ["energy_high", "novelty_seeking"],
      },
    ],
  },
  {
    id: "q4",
    prompt: "What kind of environment does your child seem to thrive in?",
    options: [
      {
        id: "A",
        text: "Calm, orderly, and predictable.",
        score: 4,
        tags: ["order_high", "focus_high"],
      },
      {
        id: "B",
        text: "A mix of structure and flexibility.",
        score: 3,
        tags: ["balanced"],
      },
      {
        id: "C",
        text: "Highly structured with clear expectations.",
        score: 2,
        tags: ["structure_need_high"],
      },
      {
        id: "D",
        text: "Energetic, busy, and constantly changing.",
        score: 1,
        tags: ["energy_high"],
      },
    ],
  },
  {
    id: "q5",
    prompt: "How does your child handle challenges or frustration?",
    options: [
      {
        id: "A",
        text: "They stick with it and try to figure it out.",
        score: 4,
        tags: ["resilient", "independent"],
      },
      {
        id: "B",
        text: "They try, but may need encouragement to keep going.",
        score: 3,
        tags: ["balanced"],
      },
      {
        id: "C",
        text: "They get discouraged and want help quickly.",
        score: 2,
        tags: ["low_confidence"],
      },
      {
        id: "D",
        text: "They avoid it and move on to something easier.",
        score: 1,
        tags: ["avoidance"],
      },
    ],
  },
  {
    id: "q6",
    prompt: "When given free time, your child usually…",
    options: [
      {
        id: "A",
        text: "Chooses one activity and sticks with it for a while.",
        score: 4,
        tags: ["focus_high"],
      },
      {
        id: "B",
        text: "Rotates between a few preferred activities.",
        score: 3,
        tags: ["balanced"],
      },
      {
        id: "C",
        text: "Looks for direction or asks what they should do.",
        score: 2,
        tags: ["structure_need_high"],
      },
      {
        id: "D",
        text: "Gets bored easily and needs stimulation.",
        score: 1,
        tags: ["energy_high"],
      },
    ],
  },
  {
    id: "q7",
    prompt: "What motivates your child most?",
    options: [
      {
        id: "A",
        text: "The joy of doing or learning something new.",
        score: 4,
        tags: ["intrinsic"],
      },
      {
        id: "B",
        text: "A mix of enjoyment and encouragement from others.",
        score: 3,
        tags: ["balanced"],
      },
      {
        id: "C",
        text: "Praise, rewards, or external recognition.",
        score: 2,
        tags: ["extrinsic"],
      },
      {
        id: "D",
        text: "Novelty, excitement, or fast-paced experiences.",
        score: 1,
        tags: ["energy_high"],
      },
    ],
  },
];

export const ARCHETYPES: ArchetypeDefinition[] = [
  {
    key: "deep-diver",
    title: "Deep Diver",
    emoji: "🌿",
    scoreMin: 24,
    scoreMax: 28,
    compatibilityStars: 5,
    personalitySentence: "Focused, curious, and wired for meaningful work.",
    resultDescription:
      "Your child seems especially ready for the kind of calm, purposeful independence Montessori is designed to protect. They may flourish when they’re trusted with real work, meaningful choice, and time to concentrate deeply.",
    fitIf: [
      "The classroom protects long stretches of uninterrupted work.",
      "Guides know how to step in lightly, without interrupting concentration.",
      "Materials invite mastery, repetition, and self-correction.",
    ],
    accent: {
      from: "#4a685f",
      to: "#243f39",
      glow: "rgba(82, 114, 104, 0.26)",
    },
  },
  {
    key: "curious-explorer",
    title: "Curious Explorer",
    emoji: "🔍",
    scoreMin: 20,
    scoreMax: 23,
    compatibilityStars: 5,
    personalitySentence: "Independent, inquisitive, and ready to discover.",
    resultDescription:
      "Your child appears naturally curious and open to discovery, which can be a beautiful match for Montessori. With a prepared environment and a guide who channels curiosity well, they may find both freedom and purpose in their learning.",
    fitIf: [
      "There are hands-on materials that reward exploration and discovery.",
      "The guide offers freedom within clear boundaries.",
      "Curiosity is treated as something to nurture, not rush past.",
    ],
    accent: {
      from: "#56756b",
      to: "#2b4942",
      glow: "rgba(101, 133, 122, 0.24)",
    },
  },
  {
    key: "balanced-learner",
    title: "Balanced Learner",
    emoji: "⚖️",
    scoreMin: 16,
    scoreMax: 19,
    compatibilityStars: 4,
    personalitySentence: "A thoughtful mix of independence and guidance.",
    resultDescription:
      "Your child may do best in a learning environment that blends freedom with steady support. Montessori can still be a strong fit, especially when the classroom offers both structure and room to grow into independence over time.",
    fitIf: [
      "The guide offers warmth, consistency, and a gradual release of responsibility.",
      "Routines are clear, but not rigid.",
      "Children are invited toward independence at a pace that feels safe and doable.",
    ],
    accent: {
      from: "#b1915a",
      to: "#43514a",
      glow: "rgba(201, 165, 98, 0.20)",
    },
  },
  {
    key: "guided-achiever",
    title: "Guided Achiever",
    emoji: "🧭",
    scoreMin: 12,
    scoreMax: 15,
    compatibilityStars: 3,
    personalitySentence: "Ready to grow with clear support and encouragement.",
    resultDescription:
      "Your child may thrive best when support is clear, expectations are steady, and encouragement is close by. Montessori could still be a great fit, especially in a classroom where the guide is attentive and skilled at helping children build confidence step by step.",
    fitIf: [
      "The classroom has clear routines and gentle accountability.",
      "Teachers check in consistently and build confidence with small wins.",
      "Support is responsive, warm, and never shaming.",
    ],
    accent: {
      from: "#a98752",
      to: "#32453e",
      glow: "rgba(191, 156, 93, 0.20)",
    },
  },
  {
    key: "energetic-explorer",
    title: "Energetic Explorer",
    emoji: "⚡",
    scoreMin: 7,
    scoreMax: 11,
    compatibilityStars: 3,
    personalitySentence: "Full of movement, curiosity, and possibility.",
    resultDescription:
      "Your child may bring a lot of energy, curiosity, and movement into the learning process. Montessori could be a good fit when the environment is active, hands-on, and led by a guide who knows how to channel energy into purposeful work.",
    fitIf: [
      "There is room for movement, practical life work, and hands-on engagement.",
      "The guide is skilled at helping energetic children settle into meaningful activity.",
      "The classroom offers variety without tipping into chaos.",
    ],
    accent: {
      from: "#c39a5e",
      to: "#4d4838",
      glow: "rgba(210, 168, 103, 0.20)",
    },
  },
];

export const ARCHETYPE_PREVIEW = [
  {
    title: "The Deep Diver",
    emoji: "🌿",
    sentence: "Focused, independent, and driven by mastery.",
  },
  {
    title: "The Curious Explorer",
    emoji: "🔍",
    sentence: "Inquisitive, hands-on, and eager to discover.",
  },
  {
    title: "The Balanced Learner",
    emoji: "⚖️",
    sentence: "Thrives with both structure and independence.",
  },
  {
    title: "The Guided Achiever",
    emoji: "🧭",
    sentence: "Confident with support and clear direction.",
  },
  {
    title: "The Energetic Explorer",
    emoji: "⚡",
    sentence: "Active, curious, and fueled by movement.",
  },
] as const;

const TAG_PRIORITY: QuizTag[] = [
  "independent",
  "focus_high",
  "intrinsic",
  "autonomy_high",
  "structure_need_high",
  "energy_high",
  "low_confidence",
  "balanced",
  "order_high",
  "guided",
  "extrinsic",
  "novelty_seeking",
  "resilient",
  "avoidance",
  "focus_medium",
  "low_focus",
  "confident",
];

const TAG_SENTENCES: Record<QuizTag, string> = {
  focus_high: "When something truly matters to them, they may be capable of long stretches of concentration.",
  intrinsic: "They seem especially motivated by the satisfaction of learning and doing something well.",
  independent: "They appear to gain confidence when they have room to try, choose, and work things out for themselves.",
  focus_medium: "They may stay engaged best when work feels purposeful but still has enough freshness to hold their attention.",
  structure_need_high: "Clear routines, predictable expectations, and gentle guidance will likely help them feel secure enough to stretch.",
  guided: "A warm adult presence and step-by-step support may help them settle into new work more confidently.",
  energy_high: "Movement, variety, and hands-on experiences seem important for helping them stay meaningfully engaged.",
  low_focus: "Shorter bursts of work and a thoughtfully prepared environment may matter at first as they build stamina.",
  autonomy_high: "Having meaningful choice appears to help them stay invested and cooperative.",
  balanced: "They seem to benefit from a healthy mix of independence and support, rather than too much of either.",
  confident: "They show signs of trusting themselves enough to try, experiment, and learn through mistakes.",
  low_confidence: "Encouragement and early wins may help them trust their own ability and stay with something a little longer.",
  novelty_seeking: "Freshness and discovery can be powerful hooks for their curiosity.",
  order_high: "A calm, orderly space may help them do their best thinking and learning.",
  resilient: "They show signs of sticking with challenges when the work feels meaningful.",
  avoidance: "If something feels too hard too quickly, they may need more invitation, pacing, and scaffolded success.",
  extrinsic: "Warm feedback and recognition may still play an important role in keeping them encouraged.",
};

const TAG_CLASSROOM_BULLETS: Partial<Record<QuizTag, string>> = {
  independent: "Plenty of meaningful choice and time for self-directed work",
  autonomy_high: "Freedom within clear boundaries, so independence stays purposeful",
  structure_need_high: "Clear routines, predictable rhythms, and teacher check-ins",
  guided: "Warm, attentive adult support when a child needs help getting started",
  energy_high: "Movement, hands-on materials, and room for active exploration",
  low_confidence: "Encouragement, carefully sequenced lessons, and guided support",
  focus_high: "Long, uninterrupted work cycles in a calm, orderly environment",
  order_high: "A beautifully prepared classroom where everything has a place",
  balanced: "A classroom that blends independence with steady adult guidance",
  intrinsic: "Teachers who protect curiosity instead of leaning too heavily on rewards",
  extrinsic: "Guides who notice effort and build confidence with thoughtful feedback",
  novelty_seeking: "Fresh invitations to work and materials that feel engaging right away",
};

const TRAIT_LABELS: Partial<Record<QuizTag, string>> = {
  independent: "independence",
  autonomy_high: "autonomy",
  focus_high: "strong focus",
  structure_need_high: "a need for structure",
  guided: "guided support",
  energy_high: "high energy",
  low_confidence: "growing confidence",
  intrinsic: "intrinsic motivation",
  extrinsic: "external encouragement",
  balanced: "a balance of freedom and structure",
  order_high: "a love of order",
  novelty_seeking: "novelty",
};

const ARCHETYPE_LEADS: Record<ArchetypeKey, string> = {
  "deep-diver": "Your answers suggest a child who may feel especially at home in calm, purposeful work.",
  "curious-explorer": "Your answers point to a child whose curiosity can become a powerful engine for learning.",
  "balanced-learner": "Your answers suggest a child who may flourish when independence and support are both present.",
  "guided-achiever": "Your answers point to a child who may grow best with warmth, clarity, and steady encouragement.",
  "energetic-explorer": "Your answers suggest a child who brings movement, curiosity, and momentum into the learning process.",
};

export interface QuizResult {
  answers: AnswerId[];
  score: number;
  archetype: ArchetypeDefinition;
  tagCounts: Record<QuizTag, number>;
  topTags: QuizTag[];
  dominantTraitLabels: string[];
  personalizedInsight: string;
  classroomBullets: string[];
}

export function getArchetypeForScore(score: number): ArchetypeDefinition {
  const match = ARCHETYPES.find(
    (archetype) => score >= archetype.scoreMin && score <= archetype.scoreMax,
  );

  return match ?? ARCHETYPES[ARCHETYPES.length - 1];
}

export function calculateQuizResult(answerIds: AnswerId[]): QuizResult {
  const selectedOptions = answerIds.map((answerId, index) => {
    const option = QUESTIONS[index]?.options.find((candidate) => candidate.id === answerId);

    if (!option) {
      throw new Error(`Invalid answer '${answerId}' for question index ${index}.`);
    }

    return option;
  });

  const score = selectedOptions.reduce((total, option) => total + option.score, 0);
  const archetype = getArchetypeForScore(score);
  const tagCounts = selectedOptions.reduce<Record<QuizTag, number>>((counts, option) => {
    option.tags.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });

    return counts;
  }, {} as Record<QuizTag, number>);

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }

      return TAG_PRIORITY.indexOf(a[0] as QuizTag) - TAG_PRIORITY.indexOf(b[0] as QuizTag);
    })
    .slice(0, 3)
    .map(([tag]) => tag as QuizTag);

  const dominantTraitLabels = topTags
    .map((tag) => TRAIT_LABELS[tag])
    .filter((label): label is string => Boolean(label));

  const personalizedInsight = buildPersonalizedInsight(archetype.key, topTags);
  const classroomBullets = buildClassroomBullets(tagCounts, topTags);

  return {
    answers: answerIds,
    score,
    archetype,
    tagCounts,
    topTags,
    dominantTraitLabels,
    personalizedInsight,
    classroomBullets,
  };
}

export function serializeAnswers(answers: AnswerId[]): string {
  return answers.join("");
}

export function deserializeAnswers(input: string | null | undefined): AnswerId[] | null {
  if (!input || input.length !== QUESTIONS.length) {
    return null;
  }

  const answers = input.toUpperCase().split("");
  if (!answers.every((answer) => ["A", "B", "C", "D"].includes(answer))) {
    return null;
  }

  return answers as AnswerId[];
}

function buildPersonalizedInsight(
  archetypeKey: ArchetypeKey,
  topTags: QuizTag[],
): string {
  const sentences = [ARCHETYPE_LEADS[archetypeKey]];

  topTags
    .map((tag) => TAG_SENTENCES[tag])
    .filter(Boolean)
    .slice(0, 2)
    .forEach((sentence) => sentences.push(sentence));

  return sentences.join(" ");
}

function buildClassroomBullets(
  tagCounts: Record<QuizTag, number>,
  topTags: QuizTag[],
): string[] {
  const preferredOrder: QuizTag[] = [
    ...topTags,
    "independent",
    "structure_need_high",
    "energy_high",
    "low_confidence",
    "focus_high",
    "balanced",
    "intrinsic",
    "extrinsic",
    "order_high",
    "guided",
    "novelty_seeking",
    "autonomy_high",
  ];

  const bullets: string[] = [];

  preferredOrder.forEach((tag) => {
    if (!tagCounts[tag]) {
      return;
    }

    const bullet = TAG_CLASSROOM_BULLETS[tag];
    if (bullet && !bullets.includes(bullet)) {
      bullets.push(bullet);
    }
  });

  return bullets.slice(0, Math.max(3, Math.min(5, bullets.length)));
}

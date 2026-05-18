export interface QuizLeadFormState {
  parentFirstName: string;
  email: string;
  childAge: string;
  city: string;
}

export const INITIAL_LEAD_FORM: QuizLeadFormState = {
  parentFirstName: "",
  email: "",
  childAge: "",
  city: "",
};

export const QUIZ_LEAD_RESULT_SUBMITTED_KEY = "montessori-quiz-result-submitted";

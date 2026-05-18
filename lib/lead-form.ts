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

export const QUIZ_LEAD_STORAGE_KEY = "montessori-quiz-lead";
export const QUIZ_LEAD_RESULT_SUBMITTED_KEY = "montessori-quiz-result-submitted";

export function hasLeadFormData(form: QuizLeadFormState) {
  return Boolean(form.parentFirstName || form.email || form.childAge || form.city);
}

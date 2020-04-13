export interface SurveyApi {
    id: number;
    name: string;
    questionIds: string[];
}

export interface QuestionApi {
    id: number;
    surveyId: number;
    answerId: string;
    question: string;
}

export interface AnswerApi {
    id: number;
    questionId: number;
    rating: number;
}
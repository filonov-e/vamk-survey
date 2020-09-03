import { SerializedError } from "@reduxjs/toolkit";

export interface SurveyApi {
    id: string;
    name: string;
    created: string;
}

export interface QuestionApi {
    id: string;
    surveyId: string;
    created: string;
    question: string;
    answerType: AnswerType;
}

export type AnswerApi = AnswerRating | AnswerText;

export interface AnswerApiBase {
    id: string;
    questionId: string;
    created: string;
    type: AnswerType;
}

export interface AnswerRating extends AnswerApiBase {
    type: "rating";
    rating: number;
}

export interface AnswerText extends AnswerApiBase {
    type: "text";
    text: string;
}

export type AnswerType = "rating" | "text";

export type Loading<T> = {
    loading: boolean;
    data: T | null;
    error: SerializedError | null;
};

// export interface DbSurveyApi extends SurveyApi {
//     id: string;
// }

// export interface DbQuestionApi extends QuestionApi {
//     id: string;
// }

// export interface DbAnswerApi extends AnswerApi {
//     id: string;
// }

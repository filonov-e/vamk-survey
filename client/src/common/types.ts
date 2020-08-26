export interface SurveyApi {
    id: string;
    name: string;
}

export interface QuestionApi {
    id: string;
    surveyId: string;
    question: string;
}

export type AnswerApi = AnswerRating | AnswerText;

export interface AnswerApiBase {
    id: string;
    questionId: string;
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

// export interface DbSurveyApi extends SurveyApi {
//     id: string;
// }

// export interface DbQuestionApi extends QuestionApi {
//     id: string;
// }

// export interface DbAnswerApi extends AnswerApi {
//     id: string;
// }

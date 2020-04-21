export interface SurveyApi {
    name: string;
}

export interface QuestionApi {
    surveyId: string;
    question: string;
}

export interface AnswerApi {
    questionId: string;
    rating: number;
}

export interface DbSurveyApi extends SurveyApi {
    id: string;
}

export interface DbQuestionApi extends QuestionApi {
    id: string;
}

export interface DbAnswerApi extends AnswerApi {
    id: string;
}
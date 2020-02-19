export interface SurveysApi {
    surveyIds: string[];
}

export interface SurveyApi {
    id: number;
    name: string;
    stepContent: string[];
    optionalSteps?: number[];
}
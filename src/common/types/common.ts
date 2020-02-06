export interface SurveysApi {
    surveyIds: string[];
}

export interface SurveyApi {
    id: string;
    name: string;
    stepContent: string[];
    optionalSteps?: number[];
}
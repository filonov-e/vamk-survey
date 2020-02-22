export interface Survey {
    id: number;
    name: string;
}

export interface Question {
    id: number;
    surveyId: number;
    question: string;
}

export interface Answer {
    id: number;
    questionId: number;
    rating: number;
}
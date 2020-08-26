import React, { useState, useEffect } from "react";
import { getSurveys } from "common/db/surveys";
import { getSurveyQuestions } from "common/db/questions";
import { getQuestionAnswer } from "common/db/answers";
import { SurveyApi, QuestionApi, AnswerApi } from "common/types";

interface ContextState {
    isLoadingData: boolean;
    surveys: SurveyApi[];
    surveyQuestions: QuestionApi[];
    questionAnswer?: AnswerApi;
    loadSurveys: () => void;
    loadSurveyQuestions: (surveyId: string) => void;
    loadQuestionAnswer: (questionId: string) => void;
}

const INITIAL_STATE: ContextState = {
    isLoadingData: false,
    surveys: [],
    surveyQuestions: [],
    questionAnswer: undefined,
    loadSurveys: () => {},
    loadSurveyQuestions: () => {},
    loadQuestionAnswer: () => {},
};

export const AppContext = React.createContext<ContextState>(INITIAL_STATE);

export const AppContextProvider = (props: any) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [surveys, setSurveys] = useState<SurveyApi[]>([]);
    const [surveyQuestions, setSurveyQuestions] = useState<QuestionApi[]>([]);
    const [questionAnswer, setQuestionAnswer] = useState<AnswerApi>();

    const { children }: { children: any } = props;

    useEffect(() => {
        loadSurveys();
    }, []);

    const loadSurveys = async () => {
        setIsLoadingData(true);
        getSurveys().then((data) => {
            setSurveys(data);
            setIsLoadingData(false);
        });
    };

    const loadSurveyQuestions = (surveyId: string) => {
        setIsLoadingData(true);
        getSurveyQuestions(surveyId).then((data) => {
            setSurveyQuestions(data);
            setIsLoadingData(false);
        });
    };

    const loadQuestionAnswer = (questionId: string) => {
        setIsLoadingData(true);
        getQuestionAnswer(questionId).then((data) => {
            setQuestionAnswer(data);
            setIsLoadingData(false);
        });
    };

    return (
        <AppContext.Provider
            value={{
                isLoadingData,
                surveys,
                surveyQuestions,
                questionAnswer,
                loadSurveys,
                loadSurveyQuestions,
                loadQuestionAnswer,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

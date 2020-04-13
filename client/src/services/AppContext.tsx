import React, { useState, useEffect } from "react";
import { getSurveyQuestions } from "common/db/questions";
import { SurveyApi, QuestionApi, AnswerApi } from "common/types";
import { getSurveys } from "common/db/surveys";
import { getQuestionAnswers } from "common/db/answers";

interface ContextState {
    isLoadingData: boolean;
    surveys: SurveyApi[];
    surveyQuestions: QuestionApi[];
    questionAnswers: AnswerApi[];
    loadSurveys: () => void;
    loadSurveyQuestions: (surveyId: string) => void;
    loadQuestionAnswers: (questionId: string) => void;
}

const INITIAL_STATE: ContextState = {
    isLoadingData: false,
    surveys: [],
    surveyQuestions: [],
    questionAnswers: [],
    loadSurveys: () => {},
    loadSurveyQuestions: () => {},
    loadQuestionAnswers: () => {},
};

export const AppContext = React.createContext<ContextState>(INITIAL_STATE);

export const AppContextProvider = (props: any) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [surveys, setSurveys] = useState<SurveyApi[]>([]);
    const [surveyQuestions, setSurveyQuestions] = useState<QuestionApi[]>([]);
    const [questionAnswers, setQuestionAnswers] = useState<AnswerApi[]>([]);

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

    const loadQuestionAnswers = (questionId: string) => {
        setIsLoadingData(true);
        getQuestionAnswers(questionId).then((data) => {
            setQuestionAnswers(data);
            setIsLoadingData(false);
        });
    };

    return (
        <AppContext.Provider
            value={{
                isLoadingData,
                surveys,
                surveyQuestions,
                questionAnswers,
                loadSurveys,
                loadSurveyQuestions,
                loadQuestionAnswers,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

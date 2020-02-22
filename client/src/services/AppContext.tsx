import React, { useState, useEffect } from "react";
import { getSurveyQuestions } from "../common/db/questions";
import { Survey, Question, Answer } from "common/types";
import { getSurveys } from "../common/db/surveys";
import { getQuestionAnswers } from "../common/db/answers";

interface ContextState {
    isLoadingData: boolean;
    surveys: Survey[];
    surveyQuestions: Question[];
    questionAnswers: Answer[];
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
    loadQuestionAnswers: () => {}
}

export const AppContext = React.createContext<ContextState>(INITIAL_STATE);

export const AppContextProvider = (props: any) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [surveyQuestions, setSurveyQuestions] = useState<Question[]>([]);
    const [questionAnswers, setQuestionAnswers] = useState<Answer[]>([]);

    const { children }: { children: any } = props;

    useEffect(() => {
        loadSurveys();
    }, []);

    const loadSurveys = () => {
        setIsLoadingData(true);
        getSurveys()
            .then((data) => {
                setSurveys(data);
                setIsLoadingData(false);
            });
    }

    const loadSurveyQuestions = (surveyId: string) => {
        setIsLoadingData(true);
        getSurveyQuestions(surveyId)
            .then((data) => {
                setSurveyQuestions(data);
                setIsLoadingData(false);
            });
    }

    const loadQuestionAnswers = (questionId: string) => {
        setIsLoadingData(true);
        getQuestionAnswers(questionId)
            .then((data) => {
                setQuestionAnswers(data);
                setIsLoadingData(false);
            });
    }

    return (
        <AppContext.Provider
            value={{
                isLoadingData,
                surveys,
                surveyQuestions,
                questionAnswers,
                loadSurveys,
                loadSurveyQuestions,
                loadQuestionAnswers
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
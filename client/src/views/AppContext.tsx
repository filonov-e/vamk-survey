import React, { useState, useEffect } from "react";
import { SurveyApi } from "../common/types/common";
import { getSurveys } from "../common/db/surveys";
import { csvToArray } from "../common/tools/common";

interface ContextState {
    isLoadingData: boolean;
    surveys: SurveyApi[];
}

const INITIAL_STATE: ContextState = {
    isLoadingData: false,
    surveys: []
}

export const AppContext = React.createContext<ContextState>(INITIAL_STATE);

export const AppContextProvider = (props: any) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [surveys, setSurveys] = useState<SurveyApi[]>([]);

    const { children }: { children: any } = props;

    useEffect(() => {
        setIsLoadingData(surveys.length === 0);
    }, [surveys]);

    useEffect(() => {
        setIsLoadingData(true);
        getSurveys()
            .then((data) => {
                //data.stepContent = csvToArray(data.stepContent, ';');
                const remoteSurveys = data.map((dataItem: any) => ({
                    ...dataItem,
                    stepContent: csvToArray(dataItem.stepContent, ';'),
                    optionalSteps: dataItem.optionalSteps.length ? csvToArray(dataItem.optionalSteps, ';').map(item => Number(item)) : []
                }));
                
                setSurveys(remoteSurveys);
            });
    }, []);

    return (
        <AppContext.Provider
            value={{
                isLoadingData,
                surveys
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
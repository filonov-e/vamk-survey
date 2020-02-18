import React, { useState } from "react";
import { SurveyApi } from "../common/types/common";

interface ContextState {
    isLoadingData: boolean;
    surveys: SurveyApi[];
}

const INITIAL_STATE: ContextState = {
    isLoadingData: false,
    surveys: [
        {
            id: '1',
            name: 'Test Survey 1',
            stepContent: ['one', 'two', 'three']
        },
        {
            id: '2',
            name: 'Test Survey 2',
            stepContent: ['one', 'two', 'three']
        },
        {
            id: '3',
            name: 'Test Survey 3',
            stepContent: ['one', 'two', 'three']
        }
    ]
}

export const AppContext = React.createContext<ContextState>(INITIAL_STATE);

export const AppContextProvider = (props: any) => {
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [surveys, setSurveys] = useState<SurveyApi[]>(INITIAL_STATE.surveys);

    const { children }: { children: any } = props;

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
import { Question } from "common/types";

export const getQuestions = async () => {
    const response = await fetch("http://127.0.0.1:8080/getQuestions", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
    });

    const data: Question[] = await response.json();
    
    return data;
};

export const getSurveyQuestions = async (surveyId: string) => {
    const response = await fetch("http://127.0.0.1:8080/getSurveyQuestions", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        body: JSON.stringify(surveyId)
    });

    const data: Question[] = await response.json();
    
    return data;
};
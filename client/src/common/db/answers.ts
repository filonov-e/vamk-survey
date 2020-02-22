import { Answer } from "common/types";

export const getAnswers = async () => {
    const response = await fetch("http://127.0.0.1:8080/getAnswers", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
    });

    const data: Answer[] = await response.json();
    
    return data;
};

export const getQuestionAnswers = async (questionId: string) => {
    const response = await fetch("http://127.0.0.1:8080/getQuestionAnswers", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        body: JSON.stringify({ questionId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data: Answer[] = await response.json();
    
    return data;
};
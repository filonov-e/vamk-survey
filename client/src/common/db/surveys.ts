import { Survey } from "common/types";

export const getSurveys = async () => {
    const response = await fetch("http://127.0.0.1:8080/getSurveys", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
    });

    const data: Survey[] = await response.json();
    
    return data;
};
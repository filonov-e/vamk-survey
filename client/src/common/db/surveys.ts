export const getSurveys = async () => {
    const response = await fetch("http://127.0.0.1:8080/getSurveys", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
    });

    const data = await response.json();

    return data;
};
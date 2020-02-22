import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import env from 'dotenv';
import { Survey, Question, Answer } from "common/types";

env.config();

const app = express();
app.use(cors());

const port = process.env.PORT; // default port to listen

let connection: mysql.Connection;

try {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });

    connection.connect();
} catch (e) {
    console.log(e);
}

const getSurveyTable = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `survey`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
};

const getSurveyQuestionTable = (surveyId?: string) => {
    const queryString = surveyId ?
        `SELECT * FROM \`surveyQuestion\` WHERE \`surveyId\` = ${surveyId}`
        :
        'SELECT * FROM `surveyQuestion`';
    
    return new Promise((resolve, reject) => {
        connection.query(queryString, function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
};

const getQuestionAnswerTable = (questionId?: string) => {
    const queryString = questionId ?
    `SELECT * FROM \`questionAnswer\` WHERE \`questionId\` = ${questionId}`
    :
    'SELECT * FROM `questionAnswer`';

    return new Promise((resolve, reject) => {
        connection.query(queryString, function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
};

// define endpoint for getting surveys data
app.post("/getSurveys", async (req, res, next) => {
    const surveys: Survey[] = await getSurveyTable() as any;
    res.json(surveys);
});

app.post("/getQuestions", async (req, res, next) => {
    const questions: Question[] = await getSurveyQuestionTable() as any;
    res.json(questions);
});

app.post("/getAnswers", async (req, res, next) => {
    const answers: Answer[] = await getQuestionAnswerTable() as any;
    res.json(answers);
});

app.post("/getSurveyQuestions", async (req, res, next) => {
    const surveyId = req.body;
    const questions: Question[] = await getSurveyQuestionTable(surveyId) as any;
    res.json(questions);
});

app.post("/getQuestionAnswers", async (req, res, next) => {
    const questionId = req.body;
    const answers: Answer[] = await getQuestionAnswerTable(questionId) as any;
    res.json(answers);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
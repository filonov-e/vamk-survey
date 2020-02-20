import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import env from 'dotenv';

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

const getSurveys = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `surveys`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
};

// define endpoint for getting surveys data
app.get("/getSurveys", async (req, res, next) => {
    const surveys: Array<{ id: number, name: string, stepContent: string, optionalSteps: string }> = await getSurveys() as any;

    res.json(surveys);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
import express from "express";
import mysql from 'mysql';

const app = express();
const port = 8080; // default port to listen

const connection = mysql.createConnection({
    host: 'mysql.cc.puv.fi',
    user: 'e1700698',
    password: 'aZVMGYKvKw4f',
    database: 'e1700698_surveyor'
});

const getIds = () => {
    connection.connect();

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `surveyIds`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });

        connection.end();
    });
};

// define a route handler for the default home page
app.get("/", async (req, res) => {

    // let ids: number[] = [];
    const ids: Array<{ surveyId: number }> = await getIds() as any;

    console.log(ids);

    res.send("Ids: " + ids[0].surveyId);
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
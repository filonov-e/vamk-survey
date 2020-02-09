"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const app = express_1.default();
const port = 8080; // default port to listen
const connection = mysql_1.default.createConnection({
    host: 'mysql.cc.puv.fi',
    user: 'e1700698',
    password: 'aZVMGYKvKw4f',
    database: 'e1700698_surveyor'
});
const getIds = () => {
    connection.connect();
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `surveyIds`', function (error, results, fields) {
            if (error)
                return reject(error);
            resolve(results);
        });
        connection.end();
    });
};
// define a route handler for the default home page
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let ids: number[] = [];
    const ids = yield getIds();
    console.log(ids);
    res.send("Ids: " + ids[0].surveyId);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=main.js.map
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Survey from "views/Survey";
import Home from "views/Home";
import Surveys from "views/Surveys";
import AddSurvey from "views/AddSurvey";

const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/surveys" exact component={Surveys} />
            <Route path="/surveys/:surveyId" exact component={Survey} />
            <Route path="/addSurvey" exact component={AddSurvey} />
        </Switch>
    );
};

export default AppRouter;

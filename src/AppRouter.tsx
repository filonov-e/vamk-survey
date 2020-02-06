import React from "react";
import { Route, Switch } from "react-router-dom";
import Survey from "./views/Survey";
import Home from "./views/Home";
import Surveys from "./views/Surveys";

const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/surveys" exact component={Surveys} />
                <Route path="/surveys/:surveyId" exact component={Survey} />    
            </Switch>
        </div>
    );
};

export default AppRouter;
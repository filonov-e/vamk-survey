import React from "react";
import { Route, Switch } from "react-router-dom";
import Survey from "./views/Survey";
import Home from "./views/Home";

const AppRouter = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/survey" exact component={Survey} />
            </Switch>
        </div>
    );
};

export default AppRouter;
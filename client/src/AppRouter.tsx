import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Survey from "views/Survey";
import Home from "views/Home";
import Surveys from "views/Surveys";
import AddQuestions from "views/AddQuestions";
import AddSurvey from "views/AddSurvey";
import { getActiveSurvey } from "redux/selectors/activeSurveySelectors";
import { useSelector } from "react-redux";

const AppRouter = () => {
    const activeSurveyData = useSelector(getActiveSurvey).data;
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/surveys" exact component={Surveys} />
            <Route path="/surveys/:surveyId" exact component={Survey} />
            <Route path="/addSurvey/start" exact component={AddSurvey} />
            {!activeSurveyData && (
                <Redirect path="/addSurvey/questions" to="/addSurvey/start" />
            )}
            <Route path="/addSurvey/questions" exact component={AddQuestions} />
            <Redirect path="/addSurvey" to="/addSurvey/start" />
        </Switch>
    );
};

export default AppRouter;

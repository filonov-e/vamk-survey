import React from "react";
import { List, ListItem, Typography, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getSurveys } from "redux/selectors/surveysSelectors";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveSurvey } from "redux/slices/activeSurveySlices";
import { SurveyApi } from "common/types";

const Surveys: React.FC = () => {
    const surveys = useSelector(getSurveys);

    const dispatch = useDispatch();

    const handleUpdateActiveSurvey = (survey: SurveyApi) => {
        dispatch(updateActiveSurvey(survey));
    };

    return (
        <Container>
            <Link to="/addSurvey/start">Add survey</Link>
            {surveys.loading ? (
                <Typography variant="h5">Loading...</Typography>
            ) : (
                <List>
                    {surveys.data
                        ?.slice()
                        .sort(
                            (first, second) =>
                                new Date(first.created).getTime() -
                                new Date(second.created).getTime()
                        )
                        .map((survey) => (
                            <Link
                                onClick={() => handleUpdateActiveSurvey(survey)}
                                to={`/surveys/${survey.id}`}
                                key={survey.id}
                            >
                                <ListItem button>{survey.name}</ListItem>
                            </Link>
                        ))}
                </List>
            )}
        </Container>
    );
};

export default Surveys;

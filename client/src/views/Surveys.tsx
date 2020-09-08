import React from "react";
import {
    List,
    ListItem,
    Typography,
    Container,
    Button,
    IconButton,
    Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getSurveys } from "redux/selectors/surveysSelectors";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveSurvey } from "redux/slices/activeSurveySlices";
import { SurveyApi } from "common/types";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { deleteSurvey } from "common/db/surveys";

const Surveys: React.FC = () => {
    const isAdmin = false;
    const surveys = useSelector(getSurveys);

    const dispatch = useDispatch();

    const handleUpdateActiveSurvey = (survey: SurveyApi) => {
        dispatch(updateActiveSurvey(survey));
    };

    const handleDeleteSurvey = (surveyId: string) => {
        deleteSurvey(surveyId);
    };

    return (
        <Container>
            {isAdmin && (
                <Link to="/addSurvey/start">
                    <Button variant="outlined">Add survey</Button>
                </Link>
            )}
            {surveys.loading ? (
                <Typography variant="h5">Loading...</Typography>
            ) : (
                <Grid container spacing={1}>
                    {surveys.data
                        ?.slice()
                        .sort(
                            (first, second) =>
                                new Date(first.created).getTime() -
                                new Date(second.created).getTime()
                        )
                        .map((survey) => (
                            <Grid
                                item
                                xs={12}
                                container
                                justify="center"
                                alignItems="center"
                                key={survey.id}
                            >
                                <Grid item xs={6}>
                                    <Link
                                        onClick={() =>
                                            handleUpdateActiveSurvey(survey)
                                        }
                                        to={`/surveys/${survey.id}`}
                                    >
                                        <ListItem button>
                                            {survey.name}
                                        </ListItem>
                                    </Link>
                                </Grid>
                                <Grid item xs={1}>
                                    {isAdmin && (
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteSurvey(survey.id)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                </Grid>
            )}
        </Container>
    );
};

export default Surveys;

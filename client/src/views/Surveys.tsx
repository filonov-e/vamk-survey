import React, { useContext, useState, useEffect } from "react";
import {
    List,
    ListItem,
    Typography,
    Container,
    Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import AddSurveyDialog from "components/AddSurveyDialog";
import { getSurveys } from "redux/selectors/surveysSelectors";
import { useSelector, useDispatch } from "react-redux";
import { updateActiveSurvey } from "redux/slices/activeSurveySlices";
import { SurveyApi } from "common/types";

const Surveys: React.FC = () => {
    const surveys = useSelector(getSurveys);

    const dispatch = useDispatch();

    const [isAddSurveyDialogOpen, setIsAddSurveyDialogOpen] = useState<boolean>(
        false
    );

    const openAddSurveyDialog = () => {
        setIsAddSurveyDialogOpen(true);
    };

    const closeAddSurveyDialog = () => {
        setIsAddSurveyDialogOpen(false);
    };

    const handleUpdateActiveSurvey = (survey: SurveyApi) => {
        dispatch(updateActiveSurvey(survey));
    };

    return (
        <Container>
            <Link to="/addSurvey">Add survey</Link>
            {surveys.loading ? (
                <Typography variant="h5">Loading...</Typography>
            ) : (
                <List>
                    {surveys.data?.map((survey) => (
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

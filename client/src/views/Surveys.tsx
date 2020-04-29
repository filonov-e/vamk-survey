import React, { useContext, useState } from "react";
import {
    List,
    ListItem,
    Typography,
    Container,
    Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { AppContext } from "services/AppContext";
import AddSurveyDialog from "components/AddSurveyDialog";

const Surveys: React.FC = () => {
    const state = useContext(AppContext);
    const { surveys, isLoadingData } = state;

    const [isAddSurveyDialogOpen, setIsAddSurveyDialogOpen] = useState<boolean>(
        false
    );

    const openAddSurveyDialog = () => {
        setIsAddSurveyDialogOpen(true);
    };

    const closeAddSurveyDialog = () => {
        setIsAddSurveyDialogOpen(false);
    };

    return (
        <Container>
            <Button onClick={openAddSurveyDialog}>Add survey</Button>
            {isLoadingData ? (
                <Typography variant="h5">Loading...</Typography>
            ) : (
                <List>
                    {surveys.map((survey) => (
                        <Link to={`/surveys/${survey.id}`} key={survey.id}>
                            <ListItem button>{survey.name}</ListItem>
                        </Link>
                    ))}
                </List>
            )}
            <AddSurveyDialog open={isAddSurveyDialogOpen} onClose={closeAddSurveyDialog} onSubmit={() => {}} />
        </Container>
    );
};

export default Surveys;

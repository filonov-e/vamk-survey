import React, { useState, ChangeEvent, useEffect } from "react";
import { Container, TextField, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getNewSurveyId } from "common/db/surveys";
import { updateActiveSurvey } from "redux/slices/activeSurveySlices";

const AddSurvey = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [surveyId, setSurveyId] = useState<string>();
    const [surveyName, setSurveyName] = useState<string>("");

    useEffect(() => {
        const updateNewSurveyId = async () => {
            const newSurveyId = await getNewSurveyId();
            setSurveyId(newSurveyId);
        };
        updateNewSurveyId();
    }, []);

    const handleSurveyNameChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        setSurveyName(value);
    };

    const handleContinue = () => {
        if (!surveyId) {
            return;
        }

        dispatch(
            updateActiveSurvey({
                id: surveyId,
                name: surveyName,
                created: new Date().toISOString(),
            })
        );
        history.push("/addSurvey/questions");
    };

    return (
        <Container>
            <Typography>Survey name</Typography>
            <TextField value={surveyName} onChange={handleSurveyNameChange} />
            <Button disabled={!surveyName} onClick={handleContinue}>
                Next
            </Button>
        </Container>
    );
};

export default AddSurvey;

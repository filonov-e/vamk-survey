import React, { useState, ChangeEvent } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import { QuestionApi, SurveyApi } from "common/types";

interface OwnProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (login: string, password: string) => void;
}

type Props = OwnProps;

const SURVEY_INITIAL_STATE: SurveyApi = {
    name: "New Survey",
};

const QUESTION_INITIAL_STATE: QuestionApi = {
    question: "Test question",
    surveyId: "",
};

const AddSurveyDialog: React.FC<Props> = (props) => {
    const { open, onClose, onSubmit } = props;
    const [survey, setSurvey] = useState<SurveyApi>(SURVEY_INITIAL_STATE);
    const [questions, setQuestions] = useState<QuestionApi[]>([]);
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleAddQuestion = () => {
        setQuestions(() => [...questions, QUESTION_INITIAL_STATE]);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add survey</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter data for the new survey
                </DialogContentText>
                <Stepper activeStep={activeStep}>
                    {questions.map((questionItem) => {
                        const { question } = questionItem;
                        return (
                            <Step key={question}>
                                <StepLabel>{question}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <DialogActions>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button onClick={handleAddQuestion}>+ Add</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AddSurveyDialog;

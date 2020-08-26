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
    StepContent,
    makeStyles,
} from "@material-ui/core";
import { QuestionApi, SurveyApi } from "common/types";

interface OwnProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (login: string, password: string) => void;
}

type Props = OwnProps;

const SURVEY_INITIAL_STATE: Omit<SurveyApi, "id"> = {
    name: "New Survey",
};

const QUESTION_INITIAL_STATE: Omit<QuestionApi, "id" | "surveyId"> = {
    question: "Test question",
};

const AddSurveyDialog: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { open, onClose, onSubmit } = props;
    const [survey, setSurvey] = useState<Omit<SurveyApi, "id">>(
        SURVEY_INITIAL_STATE
    );
    const [questions, setQuestions] = useState<
        Omit<QuestionApi, "id" | "surveyId">[]
    >([]);
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleAddQuestion = () => {
        setQuestions(() => [...questions, QUESTION_INITIAL_STATE]);
        setActiveStep(questions.length);
    };

    const handleQuestionChange = (index: number) => {
        return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = event.target;
            const updatedQuestion = {
                ...questions[index],
                question: value,
            };
            let updatedQuestions = questions.slice();
            updatedQuestions[index] = updatedQuestion;
            setQuestions(updatedQuestions);
        };
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add survey</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter data for the new survey
                </DialogContentText>
                <Stepper orientation="vertical">
                    {questions.map((questionItem, index) => {
                        const { question } = questionItem;
                        return (
                            <Step key={index} active>
                                <StepLabel>{index + 1}</StepLabel>
                                <StepContent>
                                    <TextField
                                        value={question}
                                        onChange={handleQuestionChange(index)}
                                    />
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
                <DialogActions className={classes.dialogActions}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        disabled={activeStep === questions.length}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                    <Button onClick={handleAddQuestion}>+ Add</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

const useStyles = makeStyles((theme) => ({
    dialogActions: {
        position: "absolute",
        bottom: 8,
        left: 64,
    },
}));

export default AddSurveyDialog;

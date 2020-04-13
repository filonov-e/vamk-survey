import React, { useState, useContext, useEffect } from "react";
import {
    Container,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    makeStyles,
    Slider,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { AppContext } from "../services/AppContext";
import { updateSurvey } from "common/db/surveys";
import { SurveyApi, AnswerApi } from "common/types";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    slider: {
        width: 300,
    },
}));

const Survey: React.FC = () => {
    const classes = useStyles();

    const state = useContext(AppContext);
    const { surveys } = state;
    const { surveyId } = useParams<{ surveyId: string }>();

    useEffect(() => {
        state.loadSurveyQuestions(surveyId);
    });

    const survey = surveys.find((survey) => survey.id === Number(surveyId));
    const questions = state.surveyQuestions;

    const steps: string[] = questions.map((_) => "");

    const [activeStep, setActiveStep] = useState<number>(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [answers, setAnswers] = useState<AnswerApi[]>([]);

    const getStepContent = (step: number) => {
        return questions[step].question;
    };

    const isStepOptional = (step: number) => {
        return false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleFinish = () => {
        handleNext();
        handleUpdateAnswer();
    };

    const handleUpdateAnswer = () => {
        const questionsIds = questions.map((question) => question.id);

        // const updatedSurveyAnswers: AnswerApi = {
        //     id: ,
        //     name
        // };

        // updateAnswer(surveyId, );
    };

    const handleRatingChange = (
        event: React.ChangeEvent<{}>,
        value: number | number[]
    ) => {
        // setAnswers((value as unknown) as number);
    };

    return (
        <Container>
            <Typography variant="h4">{survey?.name}</Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <React.Fragment>
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        </React.Fragment>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button
                            onClick={handleReset}
                            className={classes.button}
                        >
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>
                            {getStepContent(activeStep)}
                        </Typography>
                        <div>
                            {/* todo slider */}
                            <Slider
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={5}
                                className={classes.slider}
                            />
                        </div>
                        <div>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                            </Button>
                            {isStepOptional(activeStep) ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSkip}
                                    className={classes.button}
                                >
                                    Skip
                                </Button>
                            ) : null}
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleFinish}
                                    className={classes.button}
                                >
                                    Finish
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Survey;

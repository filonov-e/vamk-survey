import React, { useState, ChangeEvent, useEffect } from "react";
import { updateSurvey } from "common/db/surveys";
import { QuestionApi, AnswerType } from "common/types";
import {
    Button,
    Typography,
    TextField,
    Container,
    makeStyles,
    Paper,
    Grid,
} from "@material-ui/core";
import { getNewQuestionId, updateQuestion } from "common/db/questions";
import AnswerSelectionDialog from "components/AnswerSelectionDialog";
import { Pagination } from "@material-ui/lab";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { getActiveSurvey } from "redux/selectors/activeSurveySelectors";
import { useHistory } from "react-router-dom";

const AddQuestions = () => {
    const history = useHistory();
    const surveyData = useSelector(getActiveSurvey).data;
    const surveyId = surveyData?.id;
    const surveyName = surveyData?.name;
    const created = surveyData?.created;

    const [questions, setQuestions] = useState<QuestionApi[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const [answerSelectionDialogOpen, setAnswerSelectionDialogOpen] = useState<
        boolean
    >(false);

    const activeQuestion = questions[activeQuestionIndex];

    const classes = useStyles(questions.length === 0);

    useEffect(() => {
        questions.length > 0 && setActiveQuestionIndex(questions.length - 1);
    }, [questions.length]);

    const handleAddQuestion = async () => {
        if (!surveyId) {
            return;
        }

        const newQuestionId = await getNewQuestionId();
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
                id: newQuestionId,
                surveyId,
                created: new Date().toISOString(),
                question: "",
                answerType: "rating",
            },
        ]);
    };

    const handleQuestionChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        const updatedQuestions = [...questions];
        updatedQuestions[activeQuestionIndex].question = value;
        setQuestions(updatedQuestions);
    };

    const handleUpdateAnswerType = (type: AnswerType) => {
        setAnswerSelectionDialogOpen(false);
        updateQuestionAnswerType(type);
    };

    const updateQuestionAnswerType = (type: AnswerType) => {
        const updatedQuestions = [...questions];
        updatedQuestions[activeQuestionIndex].answerType = type;
        setQuestions(updatedQuestions);
    };

    const openAnswerSelectionDialog = () => {
        setAnswerSelectionDialogOpen(true);
    };

    const handleQuestionIndexChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setActiveQuestionIndex(page - 1);
    };

    const handleSaveSurvey = () => {
        if (!surveyId || !surveyName || !created) {
            return;
        }
        updateSurvey({ id: surveyId, name: surveyName, created });
        questions.forEach((q) => {
            updateQuestion(q);
        });
        history.push("/surveys");
    };

    return (
        <Container>
            <Pagination
                classes={{
                    root: classes.paginationRoot,
                    ul: classes.paginationUl,
                }}
                count={questions.length}
                shape="rounded"
                page={activeQuestionIndex + 1}
                onChange={handleQuestionIndexChange}
            />
            {questions.length === 0 && (
                <Typography
                    className={classes.noQuestionsLabel}
                    variant="h4"
                    color="textSecondary"
                >
                    No questions added yet
                </Typography>
            )}
            <div className={classes.addQuestionButtonContainer}>
                <Button
                    className={classNames(classes.addQuestionButton, {
                        [classes.animatedAddQuestionButton]:
                            questions.length === 0,
                    })}
                    onClick={handleAddQuestion}
                >
                    + Add question
                </Button>
            </div>
            {questions.length > 0 && (
                <>
                    <Paper classes={{ root: classes.paperRoot }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={handleQuestionChange}
                                    placeholder="Enter question"
                                    value={activeQuestion.question}
                                    multiline
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {activeQuestion && (
                                    <Typography variant="button">
                                        Selected answer type:{" "}
                                        {activeQuestion.answerType}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="outlined"
                                    onClick={openAnswerSelectionDialog}
                                >
                                    Change answer type
                                </Button>
                            </Grid>
                            <AnswerSelectionDialog
                                open={answerSelectionDialogOpen}
                                onSelect={handleUpdateAnswerType}
                            />
                        </Grid>
                    </Paper>
                    <Button
                        disabled={
                            questions.length === 0 ||
                            !questions.every((q) => q.question)
                        }
                        onClick={handleSaveSurvey}
                        className={classes.saveSurveyButton}
                    >
                        Save survey
                    </Button>
                </>
            )}
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
    paginationRoot: {
        marginBottom: theme.spacing(4),
    },
    paginationUl: {
        justifyContent: "center",
    },
    paperRoot: {
        padding: theme.spacing(2, 4),
    },
    noQuestionsLabel: {
        textAlign: "center",
    },
    addQuestionButtonContainer: (empty: boolean) => ({
        position: "absolute",
        marginTop: theme.spacing(4),
        textAlign: "center",
        transition: theme.transitions.create(["max-width", "top", "right"], {
            duration: theme.transitions.duration.complex,
        }),
        width: "100%",
        maxWidth: empty ? 2000 : 176,
        top: empty ? "200px" : theme.spacing(8),
        right: empty ? "0px" : theme.spacing(4),
    }),
    saveSurveyButton: {
        position: "absolute",
        right: theme.spacing(4),
        marginTop: theme.spacing(2),
    },
    addQuestionButton: {
        fontSize: "1.1rem",
        backgroundColor: "rgba(64, 255, 64, 0.5)",
    },
    animatedAddQuestionButton: {
        animationName: "$pulsatingButton",
        animationDuration: "1s",
        animationIterationCount: "infinite",
        boxShadow: `${theme.spacing(0, 1, 1)} rgba(0, 0, 0, 0.3)`,
    },
    "@keyframes pulsatingButton": {
        "0%": { padding: "6px 8px", marginBottom: 0 },
        "50%": { padding: theme.spacing(1), marginBottom: theme.spacing(0.5) },
        "100%": { padding: "6px 8px", marginBottom: 0 },
    },
}));

export default AddQuestions;

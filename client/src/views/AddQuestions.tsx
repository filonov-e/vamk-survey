import React, { useState, ChangeEvent } from "react";
import { updateSurvey } from "common/db/surveys";
import { QuestionApi, AnswerType } from "common/types";
import {
    Button,
    Typography,
    TextField,
    Container,
    makeStyles,
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
        setQuestions((prevQuestions) => {
            const temp = [...prevQuestions];
            temp[activeQuestionIndex].question = value;
            return temp;
        });
    };

    const handleAddAnswer = async (type: AnswerType) => {
        setAnswerSelectionDialogOpen(false);
        updateQuestionAnswerType(type);
    };

    const updateQuestionAnswerType = (type: AnswerType) => {
        const filteredQuestions = questions.filter(
            (q) => q.id !== activeQuestion.id
        );

        setQuestions([
            ...filteredQuestions,
            {
                ...activeQuestion,
                answerType: type,
            },
        ]);
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
            {questions.length > 0 && (
                <TextField
                    onChange={handleQuestionChange}
                    placeholder="Enter question"
                    value={activeQuestion.question}
                    multiline
                />
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
            {activeQuestion && (
                <Button onClick={openAnswerSelectionDialog}>Add answer</Button>
            )}
            {activeQuestion && (
                <Typography variant="button">
                    Selected answer type: {activeQuestion.answerType}
                </Typography>
            )}
            <AnswerSelectionDialog
                open={answerSelectionDialogOpen}
                onSelect={handleAddAnswer}
            />
            <Button
                disabled={questions.length === 0}
                onClick={handleSaveSurvey}
            >
                Save survey
            </Button>
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

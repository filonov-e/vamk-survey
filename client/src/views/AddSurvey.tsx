import React, { useEffect, useState, ChangeEvent } from "react";
import { getNewSurveyId, updateSurvey } from "common/db/surveys";
import { QuestionApi, AnswerApi, AnswerType } from "common/types";
import {
    Button,
    Typography,
    TextField,
    Container,
    makeStyles,
} from "@material-ui/core";
import { getNewQuestionId } from "common/db/questions";
import { getNewAnswerId } from "common/db/answers";
import AnswerSelectionDialog from "components/AnswerSelectionDialog";
import { Pagination } from "@material-ui/lab";
import classNames from "classnames";

const AddSurvey = () => {
    const [surveyId, setSurveyId] = useState<string>("");
    const [surveyName, setSurveyName] = useState<string>();
    const [questions, setQuestions] = useState<QuestionApi[]>([]);
    const [answers, setAnswers] = useState<AnswerApi[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
    const [answerSelectionDialogOpen, setAnswerSelectionDialogOpen] = useState<
        boolean
    >(false);

    const activeQuestion = questions[activeQuestionIndex];
    const activeAnswer = answers[activeQuestionIndex];

    const classes = useStyles(questions.length === 0);

    useEffect(() => {
        const updateNewSurveyId = async () => {
            const newSurveyId = await getNewSurveyId();
            setSurveyId(newSurveyId);
        };
        updateNewSurveyId();
    }, []);

    const handleAddQuestion = async () => {
        const newQuestionId = await getNewQuestionId();
        setQuestions((prevQuestions) => [
            ...prevQuestions,
            {
                id: newQuestionId,
                surveyId,
                question: "",
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
        const newAnswerId = await getNewAnswerId();
        setAnswerSelectionDialogOpen(false);
        switch (type) {
            case "rating":
                handleAddAnswerRating(newAnswerId);
                break;
            case "text":
                handleAddAnswerText(newAnswerId);
            default:
                break;
        }
    };

    const handleAddAnswerRating = async (newAnswerId: string) => {
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                id: newAnswerId,
                type: "rating",
                questionId: activeQuestion.id,
                rating: 0,
            },
        ]);
    };

    const handleAddAnswerText = async (newAnswerId: string) => {
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                id: newAnswerId,
                type: "text",
                questionId: activeQuestion.id,
                text: "",
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
        // updateSurvey({ id: surveyId, name:  });
    }

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
            {activeAnswer && (
                <Typography variant="button">
                    Selected answer type: {activeAnswer.type}
                </Typography>
            )}
            <AnswerSelectionDialog
                open={answerSelectionDialogOpen}
                onSelect={handleAddAnswer}
            />
            <Button disabled={questions.length > 0} onClick={handleSaveSurvey}>Save survey</Button>
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

export default AddSurvey;

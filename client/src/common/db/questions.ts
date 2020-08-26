import { db } from "services/firebase";
import { QuestionApi } from "common/types";

export const getSurveyQuestions = async (surveyId: string) => {
    const surveyQuestionsRef = await db
        .collection("questions")
        .where("surveyId", "==", surveyId)
        .get();
    return surveyQuestionsRef.docs.map((doc) => doc.data()) as QuestionApi[];
};

export const getNewQuestionId = async () => {
    const questionsRef = await db.collection("questions").doc();
    return questionsRef.id;
};

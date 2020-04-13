import { AnswerApi } from "common/types";
import { db } from "services/firebase";

export const getAnswers = async () => {
    const questionsRef = await db.collection("answers").get();
    return questionsRef.docs.map((doc) => doc.data()) as AnswerApi[];
};

export const getQuestionAnswers = async (questionId: string) => {
    const questionAnswersRef = await db
        .collection("answers")
        .where("questionId", "==", questionId)
        .get();
    return questionAnswersRef.docs.map((doc) => doc.data()) as AnswerApi[];
};

export const updateAnswer = async (answerId: string, updatedAnswer: AnswerApi) => {
    const answerRef = await db.collection("answers").doc(answerId);
    answerRef.update(updatedAnswer);
};

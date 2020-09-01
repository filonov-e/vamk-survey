import { AnswerApi } from "common/types";
import { db } from "services/firebase";

export const getAnswers = async (answerIds: string[]) => {
    const questionsRef = await db
        .collection("answers")
        .where("id", "in", answerIds)
        .get();
    return questionsRef.docs.map((doc) => doc.data()) as AnswerApi[];
};

export const getQuestionAnswer = async (questionId: string) => {
    const questionAnswerRef = await db
        .collection("answers")
        .where("questionId", "==", questionId)
        .get();
    return questionAnswerRef.docs[0].data() as AnswerApi;
};

export const getAnswerById = async (answerId: string) => {
    const answerRef = await db.collection("answers").doc(answerId).get();
    return answerRef.data() as AnswerApi;
};

export const updateAnswer = async (updatedAnswer: AnswerApi) => {
    const { id } = updatedAnswer;
    const answerRef = await db.collection("answers").doc(id);
    answerRef.set(updatedAnswer);
};

export const getNewAnswerId = async () => {
    const answersRef = await db.collection("answers").doc();
    return answersRef.id;
};

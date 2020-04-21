import { AnswerApi, DbAnswerApi } from "common/types";
import { db } from "services/firebase";

export const getAnswers = async (answerIds: string[]) => {
    const questionsRef = await db.collection("answers").where('id', 'in', answerIds).get();
    return questionsRef.docs.map((doc) => doc.data()) as DbAnswerApi[];
};

export const getQuestionAnswer = async (questionId: string) => {
    const questionAnswerRef = await db
        .collection("answers")
        .where('questionId', '==', questionId)
        .get();
    return questionAnswerRef.docs[0].data() as DbAnswerApi;
}

export const getAnswerById = async (answerId: string) => {
    const answerRef = await db
        .collection("answers")
        .doc(answerId)
        .get();
    return answerRef.data() as DbAnswerApi;
};

export const updateAnswer = async (
    updatedAnswer: AnswerApi
) => {
    const answerRef = await db.collection("answers").doc();
    answerRef.set({
        ...updatedAnswer,
        id: answerRef.id
    });
};

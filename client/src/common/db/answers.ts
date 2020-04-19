import { AnswerApi } from "common/types";
import { db } from "services/firebase";

export const getAnswers = async (answerIds: string[]) => {
    const questionsRef = await db.collection("answers").get();
    return questionsRef.docs.map((doc) => doc.data()) as AnswerApi[];
};

export const getAnswerById = async (answerId: string) => {
    const questionAnswersRef = await db
        .collection("answers")
        .doc(answerId)
        .get();
    return questionAnswersRef.data() as AnswerApi;
};

export const updateAnswer = async (
    answerId: string,
    updatedAnswer: AnswerApi
) => {
    const answerRef = await db.collection("answers").doc(answerId);
    answerRef.set(updatedAnswer);
};

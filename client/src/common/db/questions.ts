import { Question } from "common/types";
import { db } from "../../services/firebase";

export const getSurveyQuestions = async (surveyId: string) => {
    const surveyQuestionsRef = await db.collection('questions')
        .where('surveyId', '==', surveyId)
        .get();
    return surveyQuestionsRef.docs.map(doc => doc.data()) as Question[];
};
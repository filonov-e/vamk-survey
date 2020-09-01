import { SurveyApi } from "common/types";
import { db } from "services/firebase";

export const getSurveys = async () => {
    const surveysRef = await db.collection("surveys").get();
    return surveysRef.docs.map((doc) => doc.data()) as SurveyApi[];
};

export const updateSurvey = async (updatedSurvey: SurveyApi) => {
    const { id } = updatedSurvey;
    const surveyRef = await db.collection("surveys").doc(id);
    surveyRef.set(updatedSurvey);
};

export const getNewSurveyId = async () => {
    const surveyRef = await db.collection("surveys").doc();
    return surveyRef.id;
}

import { Survey } from "common/types";
import { db } from "services/firebase";

export const getSurveys = async () => {
    const surveysRef = await db
        .collection('surveys')
        .get();
    return surveysRef.docs.map(doc => doc.data()) as Survey[];
};
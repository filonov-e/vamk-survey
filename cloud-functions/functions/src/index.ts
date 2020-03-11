import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.getSurveys = functions.https.onCall(async (data, context) => {
    const surveysRef = await firestore
        .collection('surveys')
        .get();
    return surveysRef.docs.map(doc => doc.data());
});

exports.getSurveyQuestions = functions.https.onCall(async (data, context) => {
    const surveyQuestionsRef = await firestore.collection('questions')
        .where('surveyId', '==', data.surveyId)
        .get();
    return surveyQuestionsRef.docs.map(doc => doc.data());
});
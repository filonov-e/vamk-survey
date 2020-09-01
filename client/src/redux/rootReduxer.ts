import { combineReducers } from "@reduxjs/toolkit";
import surveysReducer from "redux/slices/surveysSlices";
import activeSurveyReducer from "redux/slices/activeSurveySlices";
import activeSurveyQuestionsReducer from "redux/slices/activeSurveyQuestionsSlices";

const rootReducer = combineReducers({
    surveys: surveysReducer,
    activeSurvey: activeSurveyReducer,
    activeSurveyQuestions: activeSurveyQuestionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

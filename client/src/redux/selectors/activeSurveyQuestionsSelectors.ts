import { RootState } from "redux/rootReduxer";

export const getActiveSurveyQuestions = (state: RootState) => state.activeSurveyQuestions;

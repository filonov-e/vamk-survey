import { SurveyApi, Loading } from "common/types";
import {
    createSlice,
    PayloadAction,
    ThunkAction,
    Action,
} from "@reduxjs/toolkit";
import { addSurveysListener } from "common/db/surveys";

const initialState: Loading<SurveyApi[]> = {
    loading: true,
    data: null,
    error: null,
};

export let fetchSurveysUnsubscribe = () => {};

export const fetchSurveys = (): ThunkAction<
    void,
    unknown,
    unknown,
    Action<string>
> => {
    return (dispatch) => {
        fetchSurveysUnsubscribe = addSurveysListener((surveys) => {
            dispatch(updateSurveys(surveys));
        });
    };
};

const surveysSlice = createSlice({
    name: "surveys",
    initialState,
    reducers: {
        updateSurveys(state, action: PayloadAction<SurveyApi[] | null>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
    },
});

export const { updateSurveys } = surveysSlice.actions;

export default surveysSlice.reducer;

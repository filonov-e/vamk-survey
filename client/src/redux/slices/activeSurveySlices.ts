import { SurveyApi, Loading } from "common/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Loading<SurveyApi> = {
    loading: true,
    data: null,
    error: null,
};

const activeSurveySlice = createSlice({
    name: "activeSurvey",
    initialState,
    reducers: {
        updateActiveSurvey(state, action: PayloadAction<SurveyApi | null>) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
    },
});

export const { updateActiveSurvey } = activeSurveySlice.actions;

export default activeSurveySlice.reducer;

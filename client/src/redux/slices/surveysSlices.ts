import { SurveyApi, Loading } from "common/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getSurveys } from "common/db/surveys";

const initialState: Loading<SurveyApi[]> = {
    loading: true,
    data: null,
    error: null,
};

export const fetchSurveys = createAsyncThunk(
    "surveys/fetchSurveys",
    async () => {
        const surveysData = await getSurveys();
        return surveysData;
    }
);

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
    extraReducers: (builder) => {
        builder.addCase(fetchSurveys.pending, (state, action) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchSurveys.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchSurveys.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.error;
        });
    },
});

export const { updateSurveys } = surveysSlice.actions;

export default surveysSlice.reducer;

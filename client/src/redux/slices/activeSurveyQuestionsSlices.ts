import { Loading, QuestionApi } from "common/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getSurveyQuestions } from "common/db/questions";

const initialState: Loading<QuestionApi[]> = {
    loading: true,
    data: null,
    error: null,
};

export const fetchActiveSurveyQuestions = createAsyncThunk(
    "activeSurveyQuestions/fetchActiveSurveyQuestions",
    async (surveyId: string) => {
        const questionsData = await getSurveyQuestions(surveyId);
        return questionsData.sort(
            (a, b) =>
                new Date(a.created).getTime() - new Date(b.created).getTime()
        );
    }
);

const activeSurveyQuestionsSlice = createSlice({
    name: "activeSurvey",
    initialState,
    reducers: {
        updateActiveSurveyQuestions(
            state,
            action: PayloadAction<QuestionApi[] | null>
        ) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchActiveSurveyQuestions.pending, (state, action) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(
            fetchActiveSurveyQuestions.fulfilled,
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            }
        );
        builder.addCase(
            fetchActiveSurveyQuestions.rejected,
            (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.error;
            }
        );
    },
});

export const {
    updateActiveSurveyQuestions,
} = activeSurveyQuestionsSlice.actions;

export default activeSurveyQuestionsSlice.reducer;

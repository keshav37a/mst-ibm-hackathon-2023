import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  questionnaire: [],
  questionnaireLoading: false,
  questionnaireError: null,
};

const QuestionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    questionnaireLoading: (state) => {
      state.questionnaireLoading = true;
      state.questionnaireError = null;
    },
    questionnaireSuccess: (state, { payload }) => {
      state.questionnaireLoading = false;
      if (payload?.error) {
        state.questionnaireError = payload;
      } else {
        state.questionnaire = payload?.questionnaire;
      }
    },
    questionnaireFailure: (state, { payload }) => {
      state.questionnaireLoading = false;
      state.questionnaireError = payload;
    },
  },
});

export const {
  questionnaireLoading,
  questionnaireFailure,
  questionnaireSuccess,
} = QuestionnaireSlice.actions;

export default QuestionnaireSlice;

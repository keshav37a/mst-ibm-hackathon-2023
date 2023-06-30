import { createSlice } from "@reduxjs/toolkit";
import _get from "lodash/get";

export const initialState = {
  user: {},
  signinLoading: false,
  signinError: null,
  scoreSaveLoading: false,
  scoreSaveError: null,
  userInfoLoading: null,
  userInfoError: null,
  userUpdate: null,
  emailLoading: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinLoading: (state) => {
      state.signinLoading = true;
      state.signinError = null;
    },
    signinSuccess: (state, { payload }) => {
      state.signinLoading = false;
      if (payload?.error) {
        state.signinError = payload;
      } else if (payload.token) {
        state.user = payload;
      }
    },
    signinFailure: (state, { payload }) => {
      state.signinLoading = false;
      state.signinError = payload;
    },
    signout: (state) => {
      state.user = {};
    },

    signupLoading: (state) => {
      state.signupLoading = true;
      state.signupError = null;
    },
    signupSuccess: (state, { payload }) => {
      state.signupLoading = false;
      if (payload?.error) {
        state.signupError = payload;
      } else if (payload.token) {
        state.user = payload;
      }
    },
    signupFailure: (state, { payload }) => {
      state.signupLoading = false;
      state.signupError = payload;
    },
    scoreSaveLoading: (state) => {
      state.scoreSaveLoading = true;
    },
    scoreSaveSuccess: (state, { payload }) => {
      const surveyScore = _get(payload, "data.user.surveyScore", []);
      if (payload.error) {
        state.scoreSaveError = payload;
      } else if (surveyScore.length > 0) {
        state.user.surveyScore = surveyScore;
      }
      const userUpdate = _get(payload, "data.update", null);
      state.scoreSaveLoading = false;
      state.user.userUpdate = userUpdate;
    },
    scoreSaveFailure: (state, { payload }) => {
      state.scoreSaveError = payload;
      state.scoreSaveLoading = false;
    },
    userInfoLoading: (state) => {
      state.userInfoLoading = true;
    },
    userInfoSuccess: (state, { payload }) => {
      if (payload?.error) {
        state.userInfoError = payload;
      }
      state.user = payload;
    },
    userInfoFailure: (state, { payload }) => {
      state.userInfoError = payload;
      state.userInfoLoading = false;
    },
    resetUserUpdate: (state) => {
      state.user.userUpdate = null;
    },
    sendEmailLoading: (state) => {
      state.emailLoading = true;
    },
    sendEmailSuccess: (state, { payload }) => {
      state.emailLoading = false;
      state.email = payload;
    },
    sendEmailFailure: (state, { payload }) => {
      state.emailLoading = false;
      state.email = payload;
    },
  },
});

export const {
  signinLoading,
  signinSuccess,
  signinFailure,
  signupLoading,
  signupSuccess,
  signupFailure,
  signout,
  scoreSaveLoading,
  scoreSaveSuccess,
  scoreSaveFailure,
  userInfoLoading,
  userInfoSuccess,
  userInfoFailure,
  resetUserUpdate,
  sendEmailLoading,
  sendEmailSuccess,
  sendEmailFailure,
} = UserSlice.actions;

export default UserSlice;

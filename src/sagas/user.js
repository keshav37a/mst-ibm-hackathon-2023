import { put, takeLatest } from "redux-saga/effects";
import {
  postSaveUserSurveyScore as postSaveUserSurveyScoreApi,
  postUserSignIn as postUserSignInApi,
  postUserSignUp as postUserSignUpApi,
  getUserInfo as getUserInfoApi,
  postSendEmail as postSendEmailApi,
} from "../apis";

import {
  signinLoading,
  signinSuccess,
  signinFailure,
  signupLoading,
  signupSuccess,
  signupFailure,
  scoreSaveLoading,
  scoreSaveSuccess,
  scoreSaveFailure,
  userInfoLoading,
  userInfoSuccess,
  userInfoFailure,
  sendEmailLoading,
  sendEmailSuccess,
  sendEmailFailure,
} from "../store/userSlice";

function* userSigninSaga({ payload }) {
  try {
    const data = yield postUserSignInApi({ data: payload });
    const status = data?.statusCode || data?.status;
    if (data && status >= 200 && status <= 299) {
      yield put(signinSuccess(data.data));
    } else {
      yield put(signinFailure(data.data));
    }
  } catch (error) {
    yield put(signinFailure(error));
  }
}

function* userInfoSaga({ payload }) {
  try {
    const data = yield getUserInfoApi({ data: payload });
    const status = data?.statusCode || data?.status;
    if (data && status >= 200 && status <= 299) {
      yield put(userInfoSuccess(data.data));
    } else {
      yield put(userInfoFailure(data.data));
    }
  } catch (error) {
    yield put(userInfoFailure(error));
  }
}

function* userSignupSaga({ payload }) {
  try {
    const data = yield postUserSignUpApi({ data: payload });
    const status = data?.statusCode || data?.status;
    if (data && status >= 200 && status <= 299) {
      yield put(signupSuccess(data.data));
    } else {
      yield put(signupFailure(data.data));
    }
  } catch (error) {
    yield put(signupFailure(error));
  }
}

function* userSaveSurveyScoreSaga({ payload }) {
  try {
    console.log(payload);
    const data = yield postSaveUserSurveyScoreApi({ data: payload });
    const status = data?.statusCode || data?.status;
    if (data && status >= 200 && status <= 299) {
      yield put(scoreSaveSuccess(data.data));
    } else {
      yield put(scoreSaveFailure(data.data));
    }
  } catch (error) {
    yield put(scoreSaveFailure(error));
  }
}

function* sendEmailSaga({ payload }) {
  try {
    const data = yield postSendEmailApi({ data: payload });
    const status = data?.statusCode || data?.status;
    if (data && status >= 200 && status <= 299) {
      yield put(sendEmailSuccess(data.data));
    } else {
      yield put(sendEmailFailure(data.data));
    }
  } catch (error) {
    yield put(sendEmailFailure(error));
  }
}

export default [
  takeLatest(signinLoading.type, userSigninSaga),
  takeLatest(signupLoading.type, userSignupSaga),
  takeLatest(scoreSaveLoading.type, userSaveSurveyScoreSaga),
  takeLatest(userInfoLoading.type, userInfoSaga),
  takeLatest(sendEmailLoading.type, sendEmailSaga),
];

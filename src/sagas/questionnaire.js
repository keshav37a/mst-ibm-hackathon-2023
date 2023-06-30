import { put, takeLatest } from "redux-saga/effects";
import { getQuestionnaireList as getQuestionnaireListApi } from "../apis";

import {
  questionnaireLoading,
  questionnaireSuccess,
  questionnaireFailure,
} from "../store/questionnaireSlice";

function* getQuestionnaireListSaga() {
  try {
    const data = yield getQuestionnaireListApi({});
    const status = data?.statusCode || data?.status;
    if (data && status >= 200 && status <= 299) {
      yield put(questionnaireSuccess(data.data));
    } else {
      yield put(questionnaireFailure(data.data));
    }
  } catch (error) {
    console.log("error: ", error);
    yield put(questionnaireFailure(error));
  }
}

export default [
  takeLatest(questionnaireLoading.type, getQuestionnaireListSaga),
];

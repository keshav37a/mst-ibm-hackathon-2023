import { all } from "redux-saga/effects";
import userSaga from "./user";
import questionnareSaga from "./questionnaire";

export default function* rootSaga() {
  yield all([...userSaga, ...questionnareSaga]);
}

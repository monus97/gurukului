import { all } from "redux-saga/effects";
import userActionWatcher from "./userActions";

export default function* rootSaga() {
  yield all([
    userActionWatcher(),
  ]);
}

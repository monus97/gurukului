import { put, takeLatest, call } from "redux-saga/effects";

import {
  ERROR,
  GET_ALL_USER,
  GET_ALL_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
} from "../actionTypes";
import authInstance from "../../api/apiConfig";

function* loginUser(action) {
  try {
    const response = yield call(authInstance.post, "login", action.payload);

    yield put({
      type: LOGIN_USER_SUCCESS,
      payload: response?.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* addUser(action) {
  try {
    const response = yield call(authInstance.post, "add", action.payload);

    yield put({
      type: REGISTER_USER_SUCCESS,
      payload: response?.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

function* getAllUser(action) {
  try {
    const response = yield call(authInstance.get, "users");

    yield put({
      type: GET_ALL_USER_SUCCESS,
      payload: response?.data,
    });
  } catch (error) {
    const err = error.response.data.message;
    yield put({
      type: ERROR,
      payload: err,
    });
  }
}

export default function* userActionWatcher() {
  yield takeLatest(LOGIN_USER, loginUser);
  yield takeLatest(REGISTER_USER, addUser);
  yield takeLatest(GET_ALL_USER, getAllUser);
}

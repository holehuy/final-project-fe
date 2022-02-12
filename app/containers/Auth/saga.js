import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import { CookiesStorage } from 'shared/configs/cookie';
import { ENDPOINT } from 'shared/constants/endpoint';
import Api from 'shared/configs/api';
import {
  GET_TOKEN,
  REMOVE_TOKEN,
  GET_PROFILE,
  UPDATE_PROFILE,
} from 'containers/Auth/constants';

const { API } = ENDPOINT;

function getTokenApi() {
  return Api.getNotAuth(`${API.GET_ACCESS_TOKEN}`, {
    withCredentials: true,
  });
}

function getMyProfileApi() {
  return Api.get(API.GET_MY_PROFILE);
}

function updateMyProfileApi(data) {
  return Api.patch(API.UPDATE_MY_PROFILE, data);
}

export function* getToken() {
  try {
    const response = yield call(getTokenApi);
    const { data } = response;
    CookiesStorage.setAccessToken(data.accessToken);
    yield put({ type: SUCCESS(GET_TOKEN), payload: data });
  } catch (error) {
    yield put({ type: FAILURE(GET_TOKEN), error });
  }
}

export function* signOut() {
  try {
    CookiesStorage.clearData();
    yield put({ type: SUCCESS(REMOVE_TOKEN) });
  } catch (error) {
    yield put({ type: FAILURE(REMOVE_TOKEN), error });
  }
}

export function* getMyProfile() {
  try {
    const response = yield call(getMyProfileApi);
    const { data } = response;
    yield put({ type: SUCCESS(GET_PROFILE), payload: data });
  } catch (error) {
    yield put({ type: FAILURE(GET_PROFILE), error });
  }
}

export function* updateProfile({ dataProfile, callBack }) {
  const dataMyProfile = {
    ...dataProfile,
  };
  try {
    const response = yield call(updateMyProfileApi, dataMyProfile);
    const { data } = response;
    yield put({ type: SUCCESS(UPDATE_PROFILE), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(UPDATE_PROFILE), error });
  }
}

export default function* authData() {
  yield takeLatest(REQUEST(GET_TOKEN), getToken);
  yield takeLatest(REQUEST(REMOVE_TOKEN), signOut);
  yield takeLatest(REQUEST(GET_PROFILE), getMyProfile);
  yield takeLatest(REQUEST(UPDATE_PROFILE), updateProfile);
}

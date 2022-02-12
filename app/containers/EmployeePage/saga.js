import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { removeEmpty } from 'utils/common';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import Api from 'shared/configs/api';
import { ENDPOINT } from 'shared/constants/endpoint';
import messages from 'containers/EmployeePage/messages';
import {
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_TYPES,
  DELETE_EMPLOYEE,
  GET_EMPLOYEE_DETAIL,
  UPLOAD_AVATAR_EMPLOYEE,
  UPDATE_EMPLOYEE_DETAIL,
  GET_SEARCH_SUGGEST_EMPLOYEE,
  FETCH_DATA_EMPLOYEE_SLACK,
  CREATE_EMPLOYEE,
} from 'containers/EmployeePage/constants';

const { API } = ENDPOINT;

function getEmployeeApi(queryParams) {
  return Api.get(API.GET_LIST_EMPLOYEE, {
    params: {
      ...queryParams,
    },
  });
}

function getEmployeeTypeApi(query) {
  return Api.get(API.EMPLOYEE_TYPES, {
    params: {
      ...query,
    },
  });
}

function deleteEmployeeApi(employeeId) {
  return Api.delete(`${API.DELETE_EMPLOYEE}/${employeeId}`);
}

function getEmployeeDetailApi(employeeId) {
  return Api.get(`${API.GET_EMPLOYEE_DETAIL}/${employeeId}`);
}

function uploadAvatarEmployeeApi(data) {
  return Api.post(API.UPLOAD_AVATAR, data);
}

function updateEmployeeDetailApi(id, data) {
  return Api.patch(`${API.UPDATE_EMPLOYEE}/${id}`, { ...data });
}

function fetchDataEmployeeSlackApi(data) {
  return Api.post(API.FETCH_DATA_SLACK, { ...data });
}

function createEmployeeApi(data) {
  return Api.post(API.CREATE_EMPLOYEE, { ...data });
}

export function* deleteEmployee({ idEmployee, callback }) {
  try {
    yield call(deleteEmployeeApi, idEmployee);
    yield put({ type: SUCCESS(DELETE_EMPLOYEE), payload: idEmployee });
    callback?.();
  } catch (error) {
    const intl = useIntl();
    toast.error(intl.formatMessage({ ...messages.deleteFailure }));
    yield put({ type: FAILURE(DELETE_EMPLOYEE), error });
  }
}

export function* getDataEmployee(action) {
  try {
    const query = {
      page: action.dataEmployee.page,
      limit: action.dataEmployee.limit,
      filterType: action.dataEmployee.type,
      textSearch: encodeURIComponent(action.dataEmployee.textSearch.trim()),
    };

    const removeQuery = removeEmpty(query);
    const response = yield call(getEmployeeApi, removeQuery);
    const { data } = response;
    yield put({ type: SUCCESS(GET_EMPLOYEE_LIST), payload: data });
  } catch (error) {
    yield put({ type: FAILURE(GET_EMPLOYEE_LIST), error });
  }
}

export function* getEmployeeTypes(action) {
  try {
    const query = {
      lang: action.language,
    };
    const response = yield call(getEmployeeTypeApi, query);
    const { data } = response;
    yield put({ type: SUCCESS(GET_EMPLOYEE_TYPES), payload: data });
  } catch (error) {
    yield put({ type: FAILURE(GET_EMPLOYEE_TYPES), error });
  }
}

export function* GetEmployeeDetail({ idEmployee }) {
  try {
    const response = yield call(getEmployeeDetailApi, idEmployee);
    const { data } = response;
    yield put({ type: SUCCESS(GET_EMPLOYEE_DETAIL), payload: data });
  } catch (error) {
    yield put({ type: FAILURE(GET_EMPLOYEE_DETAIL), error });
  }
}

export function* uploadAvatarEmployee({ formData, callBack }) {
  try {
    const response = yield call(uploadAvatarEmployeeApi, formData);
    const { data } = response;
    yield put({ type: SUCCESS(UPLOAD_AVATAR_EMPLOYEE), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(UPLOAD_AVATAR_EMPLOYEE), error });
  }
}

export function* updateEmployeeDetail({ idEmployee, dataEmployee, callBack }) {
  try {
    const response = yield call(
      updateEmployeeDetailApi,
      idEmployee,
      dataEmployee,
    );
    const { data } = response;
    yield put({ type: SUCCESS(UPDATE_EMPLOYEE_DETAIL), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(UPDATE_EMPLOYEE_DETAIL), error });
  }
}

export function* GetSearchEmployeeSuggest(action) {
  try {
    const query = {
      page: action.dataEmployee.page,
      limit: action.dataEmployee.limit,
      filterType: action.dataEmployee.type,
      textSearch: encodeURIComponent(action.dataEmployee.textSearch.trim()),
    };

    const removeQuery = removeEmpty(query);
    const response = yield call(getEmployeeApi, removeQuery);
    const { data } = response;
    yield put({
      type: SUCCESS(GET_SEARCH_SUGGEST_EMPLOYEE),
      payload: data,
      textSearch: encodeURIComponent(action.dataEmployee.textSearch.trim()),
    });
  } catch (error) {
    yield put({ type: FAILURE(GET_SEARCH_SUGGEST_EMPLOYEE), error });
  }
}

export function* fetchDataSlack({ email, callBack }) {
  try {
    const dataPost = {
      email,
    };
    const response = yield call(fetchDataEmployeeSlackApi, dataPost);
    const { data } = response;
    yield put({ type: SUCCESS(FETCH_DATA_EMPLOYEE_SLACK), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(FETCH_DATA_EMPLOYEE_SLACK), error });
  }
}

export function* createEmployeeSaga({ dataNewEmployee, callBack }) {
  try {
    const dataPost = {
      ...dataNewEmployee,
    };
    const response = yield call(createEmployeeApi, dataPost);
    const { data } = response;
    yield put({ type: SUCCESS(CREATE_EMPLOYEE), payload: data });
    callBack?.();
  } catch (error) {
    callBack?.(error);
    yield put({ type: FAILURE(CREATE_EMPLOYEE), error });
  }
}

export default function* employeeData() {
  yield takeLatest(REQUEST(GET_EMPLOYEE_LIST), getDataEmployee);
  yield takeLatest(REQUEST(GET_EMPLOYEE_TYPES), getEmployeeTypes);
  yield takeLatest(REQUEST(DELETE_EMPLOYEE), deleteEmployee);
  yield takeLatest(REQUEST(GET_EMPLOYEE_DETAIL), GetEmployeeDetail);
  yield takeLatest(REQUEST(UPLOAD_AVATAR_EMPLOYEE), uploadAvatarEmployee);
  yield takeLatest(REQUEST(UPDATE_EMPLOYEE_DETAIL), updateEmployeeDetail);
  yield takeLatest(
    REQUEST(GET_SEARCH_SUGGEST_EMPLOYEE),
    GetSearchEmployeeSuggest,
  );
  yield takeLatest(REQUEST(FETCH_DATA_EMPLOYEE_SLACK), fetchDataSlack);
  yield takeLatest(REQUEST(CREATE_EMPLOYEE), createEmployeeSaga);
}

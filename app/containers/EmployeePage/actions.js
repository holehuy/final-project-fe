import { REQUEST } from 'utils/actionType';
import {
  GET_EMPLOYEE_LIST,
  GET_EMPLOYEE_TYPES,
  DELETE_EMPLOYEE,
  GET_EMPLOYEE_DETAIL,
  UPDATE_EMPLOYEE_DETAIL,
  UPLOAD_AVATAR_EMPLOYEE,
  GET_SEARCH_SUGGEST_EMPLOYEE,
  FETCH_DATA_EMPLOYEE_SLACK,
  CREATE_EMPLOYEE,
  DELETE_AVATAR,
  UPDATE_UPLOAD_AVATAR,
} from 'containers/EmployeePage/constants';

export function getDataEmployee(dataEmployee) {
  return {
    type: REQUEST(GET_EMPLOYEE_LIST),
    dataEmployee,
  };
}

export function getEmployeeTypes(language) {
  return {
    type: REQUEST(GET_EMPLOYEE_TYPES),
    language,
  };
}

export function deleteEmployeeId(idEmployee, callback) {
  return {
    type: REQUEST(DELETE_EMPLOYEE),
    idEmployee,
    callback,
  };
}

export function getEmployeeDetail(idEmployee) {
  return {
    type: REQUEST(GET_EMPLOYEE_DETAIL),
    idEmployee,
  };
}

export function uploadAvatarEmployee(formData, callBack) {
  return {
    type: REQUEST(UPLOAD_AVATAR_EMPLOYEE),
    formData,
    callBack,
  };
}

export function updateEmployeeDetail(idEmployee, dataEmployee, callBack) {
  return {
    type: REQUEST(UPDATE_EMPLOYEE_DETAIL),
    idEmployee,
    dataEmployee,
    callBack,
  };
}

export function getSearchSuggestEmployee(dataEmployee) {
  return {
    type: REQUEST(GET_SEARCH_SUGGEST_EMPLOYEE),
    dataEmployee,
  };
}

export function fetchDataEmployeeSlack(email, callBack) {
  return {
    type: REQUEST(FETCH_DATA_EMPLOYEE_SLACK),
    email,
    callBack,
  };
}

export function createEmployee(dataNewEmployee, callBack) {
  return {
    type: REQUEST(CREATE_EMPLOYEE),
    dataNewEmployee,
    callBack,
  };
}

export function deleteAvatar() {
  return {
    type: DELETE_AVATAR,
  };
}

export function updateUploadAvatar(urlAvatar) {
  return {
    type: UPDATE_UPLOAD_AVATAR,
    urlAvatar,
  };
}

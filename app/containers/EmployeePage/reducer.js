/* eslint-disable no-case-declarations */
import produce from 'immer';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
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
  DELETE_AVATAR,
  UPDATE_UPLOAD_AVATAR,
} from 'containers/EmployeePage/constants';

export const initialState = {
  dataEmployee: {
    data: [],
    pagination: [],
  },
  dataTypes: {
    data: [],
    isFetching: false,
  },
  isSuccess: false,
  isFetching: false,
  isError: false,
  deleteEmployee: {
    message: '',
    isFetching: false,
  },
  employeeDetail: {
    data: [],
    isFetching: false,
  },
  uploadAvatar: {
    urlUpload: '',
    isFetching: false,
  },
  updateEmployee: {
    isFetching: false,
  },
  dataSearchEmployee: {
    data: [],
    pagination: [],
    isFetching: false,
    textSearch: '',
  },
  dataSlack: {
    data: [],
    isFetching: false,
  },
  dataNewEmployee: {
    data: [],
    isFetching: false,
  },
};

const employeeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST(GET_EMPLOYEE_LIST):
        draft.isFetching = true;
        draft.isSuccess = false;
        draft.isError = false;
        break;
      case SUCCESS(GET_EMPLOYEE_LIST):
        draft.dataEmployee.data = action.payload.data;
        draft.dataEmployee.pagination = action.payload.pagination;
        draft.isFetching = false;
        draft.isSuccess = true;
        draft.isError = false;
        draft.dataSlack.data = [];
        break;
      case FAILURE(GET_EMPLOYEE_LIST):
        draft.dataEmployee.data = [];
        draft.dataEmployee.pagination = [];
        draft.isFetching = false;
        draft.isSuccess = false;
        draft.isError = true;
        break;
      case REQUEST(GET_EMPLOYEE_TYPES):
        draft.dataTypes.isFetching = true;
        break;
      case SUCCESS(GET_EMPLOYEE_TYPES):
        const dataTemp = [];
        // eslint-disable-next-line array-callback-return
        Object.keys(action.payload).map(item => {
          const values = {
            label: action.payload[item].value,
            value: action.payload[item].id,
          };
          dataTemp.push(values);
        });
        draft.dataTypes.data = dataTemp;
        draft.dataTypes.isFetching = false;
        break;
      case FAILURE(GET_EMPLOYEE_TYPES):
        draft.dataTypes.isFetching = false;
        break;
      case REQUEST(DELETE_EMPLOYEE):
        draft.deleteEmployee.isFetching = true;
        break;
      case SUCCESS(DELETE_EMPLOYEE):
        draft.deleteEmployee.isFetching = false;
        break;
      case FAILURE(DELETE_EMPLOYEE):
        draft.deleteEmployee.message = action.payload.employees;
        draft.deleteEmployee.isFetching = false;
        break;
      case REQUEST(GET_EMPLOYEE_DETAIL):
        draft.employeeDetail.isFetching = true;
        break;
      case SUCCESS(GET_EMPLOYEE_DETAIL):
        draft.employeeDetail.isFetching = false;
        draft.employeeDetail.data = action.payload.employee;
        break;
      case FAILURE(GET_EMPLOYEE_DETAIL):
        draft.employeeDetail.isFetching = false;
        break;
      case REQUEST(UPLOAD_AVATAR_EMPLOYEE):
        draft.uploadAvatar.isFetching = true;
        break;
      case SUCCESS(UPLOAD_AVATAR_EMPLOYEE):
        draft.uploadAvatar.isFetching = false;
        draft.uploadAvatar.urlUpload = action.payload.avatar;
        break;
      case FAILURE(UPLOAD_AVATAR_EMPLOYEE):
        draft.uploadAvatar.isFetching = false;
        break;
      case REQUEST(UPDATE_EMPLOYEE_DETAIL):
        draft.updateEmployee.isFetching = true;
        break;
      case SUCCESS(UPDATE_EMPLOYEE_DETAIL):
        draft.updateEmployee.isFetching = false;
        draft.employeeDetail.data = [];
        break;
      case FAILURE(UPDATE_EMPLOYEE_DETAIL):
        draft.updateEmployee.isFetching = false;
        break;
      case REQUEST(GET_SEARCH_SUGGEST_EMPLOYEE):
        draft.dataSearchEmployee.isFetching = true;
        break;
      case SUCCESS(GET_SEARCH_SUGGEST_EMPLOYEE):
        if (!action.textSearch.length) {
          draft.dataSearchEmployee.data = [];
        } else if (action.textSearch !== state.dataSearchEmployee.textSearch) {
          draft.dataSearchEmployee.data = [];
          draft.dataSearchEmployee.data = action.payload.data;
          draft.dataSearchEmployee.textSearch = action.textSearch;
        } else {
          draft.dataSearchEmployee.data = [
            ...state.dataSearchEmployee.data,
            ...action.payload.data,
          ];
        }
        draft.dataSearchEmployee.pagination = action.payload.pagination;
        draft.dataSearchEmployee.isFetching = false;
        break;
      case FAILURE(GET_SEARCH_SUGGEST_EMPLOYEE):
        draft.dataSearchEmployee.data = [];
        draft.dataSearchEmployee.isFetching = false;
        break;
      case REQUEST(FETCH_DATA_EMPLOYEE_SLACK):
        draft.dataSlack.isFetching = true;
        break;
      case SUCCESS(FETCH_DATA_EMPLOYEE_SLACK):
        draft.dataSlack.isFetching = false;
        draft.dataSlack.data = action.payload.slackProfile;
        draft.uploadAvatar.urlUpload = '';
        break;
      case FAILURE(FETCH_DATA_EMPLOYEE_SLACK):
        draft.dataSlack.data = [];
        draft.dataSlack.isFetching = false;
        break;
      case REQUEST(CREATE_EMPLOYEE):
        draft.dataNewEmployee.isFetching = true;
        break;
      case SUCCESS(CREATE_EMPLOYEE):
        draft.dataNewEmployee.isFetching = false;
        draft.dataSlack.data = [];
        draft.dataEmployee.data = [];
        draft.uploadAvatar.urlUpload = '';
        break;
      case FAILURE(CREATE_EMPLOYEE):
        draft.dataNewEmployee.isFetching = false;
        break;
      case DELETE_AVATAR:
        draft.uploadAvatar.urlUpload = '';
        break;
      case UPDATE_UPLOAD_AVATAR:
        draft.uploadAvatar.urlUpload = action.urlAvatar;
        break;
      default:
        break;
    }
  });

export default employeeReducer;

import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST, SUCCESS, FAILURE } from 'utils/actionType';
import Api from 'shared/configs/api';
import { ENDPOINT } from 'shared/constants/endpoint';
import { SUMMARIZE_ARTICLE } from 'containers/ExaminationPage/constants';

const { API } = ENDPOINT;

function getCostSettingListApi(queryParams) {
  return Api.get(API.GET_COST_SETTING_LIST, {
    params: {
      ...queryParams,
    }, 
  });
}

export function* getDataCostSettingList(action) {
  const { dataCostSetting, isLoading, isGetNew } = action;
  const query = {
    page: dataCostSetting?.page,
    limit: dataCostSetting?.limit,
  };
  try {
    const response = yield call(getCostSettingListApi, query);
    const { data } = response;
    yield put({
      type: SUCCESS(COST_SETTING_LIST),
      payload: data,
      isLoading,
      isGetNew,
    });
  } catch (error) {
    yield put({ type: FAILURE(COST_SETTING_LIST), error });
  }
}

function getCostSettingEditApi(data) {
  return Api.post(API.UPDATE_COST_SETTING, {
    ...data,
  });
}

export function* editCostSetting({ dataCostSetting, callBack }) {
  const data = {
    value: dataCostSetting,
  };
  try {
    yield call(getCostSettingEditApi, data);
    callBack?.();
  } catch (error) {
    callBack?.(error);
  }
}

export default function* CostSettingData() {
  yield takeLatest(REQUEST(COST_SETTING_LIST), getDataCostSettingList);
  yield takeLatest(REQUEST(EDIT_COST_SETTING), editCostSetting);
}

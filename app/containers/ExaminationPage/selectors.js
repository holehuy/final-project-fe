import { createSelector } from 'reselect';
import { initialState } from 'containers/ExaminationPage/reducer';

const selectCostSettingDomain = state => state.costSetting || initialState;

const makeSelectDataCostSetting = () =>
  createSelector(
    selectCostSettingDomain,
    costSettingState => costSettingState.dataCostSetting,
  );

export { makeSelectDataCostSetting };
 
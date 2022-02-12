import { createSelector } from 'reselect';
import { initialState } from 'containers/DashBoardPage/reducer';

const selectEmployee = state => state.employee || initialState;

const makeSelectDataEmployee = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.dataEmployee,
  );

const makeSelectEmployeeLoading = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.isFetching,
  );

const makeSelectEmployeeError = () =>
  createSelector(
    selectEmployee, 
    employeeState => employeeState.isError,
  );

const makeSelectEmployeeTypes = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.dataTypes || [],
  );

const makeSelectDeleteEmployee = () =>
  createSelector(
    selectEmployee,
    employeeState =>
      employeeState.deleteEmployee || { data: [], pagination: [] },
  );

const makeSelectEmployeeDetail = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.employeeDetail,
  );

const makeSelectUploadImage = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.uploadAvatar,
  );

const makeSelectUpdateEmployee = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.updateEmployee,
  );

const makeSelectSearchEmployeeSuggest = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.dataSearchEmployee,
  );

const makeSelectFetchSlack = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.dataSlack,
  );

const makeSelectCreateEmployee = () =>
  createSelector(
    selectEmployee,
    employeeState => employeeState.dataNewEmployee,
  );

export {
  selectEmployee,
  makeSelectDataEmployee,
  makeSelectEmployeeLoading,
  makeSelectEmployeeError,
  makeSelectEmployeeTypes,
  makeSelectDeleteEmployee,
  makeSelectEmployeeDetail,
  makeSelectUploadImage,
  makeSelectUpdateEmployee,
  makeSelectSearchEmployeeSuggest,
  makeSelectFetchSlack,
  makeSelectCreateEmployee,
};

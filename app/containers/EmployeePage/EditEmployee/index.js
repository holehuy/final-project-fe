import { compose } from 'redux';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import saga from 'containers/EmployeePage/saga';
import reducer from 'containers/EmployeePage/reducer';
import NewEmployeePage from 'containers/EmployeePage/NewEmployee';
import { getEmployeeDetail } from 'containers/EmployeePage/actions';
import { makeSelectEmployeeDetail } from 'containers/EmployeePage/selectors';
import EmployeeNewLoader from 'components/ContentLoader/EmployeeNewLoader';
const key = 'employee';

function EditEmployeePage({ employeeDetail, onGetEmployeeDetail }) {
  const { pathname } = useLocation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      onGetEmployeeDetail(id);
    }
  }, [id]);

  const isEditEmployee = pathname.includes('employee-edit');
  return (
    <>
      {!employeeDetail?.isFetching ? (
        <div className="edit-employee">
          <NewEmployeePage data={isEditEmployee && employeeDetail?.data} />
        </div>
      ) : (
        <EmployeeNewLoader />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  employeeDetail: makeSelectEmployeeDetail(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetEmployeeDetail: id => dispatch(getEmployeeDetail(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditEmployeePage);

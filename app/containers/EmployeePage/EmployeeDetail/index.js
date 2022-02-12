import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import React, { memo, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { ROLES } from 'shared/constants/common';
import { ENDPOINT } from 'shared/constants/endpoint';
import { iconBack } from 'shared/constants/commonIcon';
import { LAYOUT_HORIZONTAL } from 'shared/constants/commonValues';
import saga from 'containers/EmployeePage/saga';
import reducer from 'containers/EmployeePage/reducer';
import { getEmployeeDetail } from 'containers/EmployeePage/actions';
import messages from 'containers/EmployeePage/EmployeeDetail/messages';
import PassedTest from 'containers/EmployeePage/EmployeeDetail/PassedTest';
import { makeSelectEmployeeDetail } from 'containers/EmployeePage/selectors';
import RecentActivity from 'containers/EmployeePage/EmployeeDetail/RecentActivity';
import EmployeeEvaluation from 'containers/EmployeePage/EmployeeDetail/Evaluation';
import EmployeeInfor from 'containers/EmployeePage/EmployeeDetail/EmployeeInformation';
import EmployeeLoader from 'components/ContentLoader/EmployeeLoader';
const { ROUTING } = ENDPOINT;
const key = 'employee';

function EmployeeDetail({ employeeDetail, onGetEmployeeDetail, dataProfile }) {
  const { pathname } = useLocation();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const isProfile = pathname.includes('my-profile');
  const isEmployee = pathname.includes('employee-detail');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      onGetEmployeeDetail(id);
    }
  }, [id]);

  return (
    <div className="employee-detail">
      {ROLES.ADMIN === dataProfile?.profile?.role || isEmployee ? (
        <div className="back-employee-list">
          <Link to={ROUTING.EMPLOYEE_LIST} className="back-link">
            <span className="icon-back">{iconBack}</span>
            <FormattedMessage {...messages.backToEmployeeList} />
          </Link>
        </div>
      ) : null}
      <div className="employee-detail-infor">
        <div className="personal-infor">
          {employeeDetail?.isFetching || dataProfile?.isFetching ? (
            <div className="employee-detail-loading">
              <EmployeeLoader className={LAYOUT_HORIZONTAL} />
            </div>
          ) : (
            <EmployeeInfor
              data={isEmployee && employeeDetail?.data}
              profile={isProfile && dataProfile?.profile}
            />
          )}
        </div>
        <div className="activity-infor row">
          <PassedTest />
          <EmployeeEvaluation />
          <RecentActivity />
        </div>
      </div>
    </div>
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
)(EmployeeDetail);

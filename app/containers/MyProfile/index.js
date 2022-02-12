import { compose } from 'redux';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EmployeeDetail from 'containers/EmployeePage/EmployeeDetail';
import { makeSelectMyProfile } from 'containers/Auth/selectors';

function MyProfile({ dataProfile }) {
  return (
    <div className="my-profile">
      <EmployeeDetail dataProfile={dataProfile} />
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(MyProfile);

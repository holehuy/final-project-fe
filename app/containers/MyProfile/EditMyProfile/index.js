import { compose } from 'redux';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { updateProfile } from 'containers/Auth/actions';
import NewEmployeePage from 'containers/EmployeePage/NewEmployee';
import {
  makeSelectMyProfile,
  makeSelectUpdateMyProfile,
} from 'containers/Auth/selectors';
import EmployeeNewLoader from 'components/ContentLoader/EmployeeNewLoader';

const key = 'auth';

function EditMyProfile({ dataProfile, onUpdateProfile, updateMyProfile }) {
  const { pathname } = useLocation();
  const isEditProfile = pathname.includes('edit-my-profile');

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <>
      {!dataProfile?.isFetching ? (
        <div className="edit-my-profile">
          <NewEmployeePage
            profile={isEditProfile && dataProfile?.profile}
            onUpdateProfile={onUpdateProfile}
            updateProfile={updateMyProfile}
          />
        </div>
      ) : (
        <div className="profile-loading">
          <EmployeeNewLoader />
        </div>
      )}
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
  updateMyProfile: makeSelectUpdateMyProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onUpdateProfile: (data, callBack) =>
      dispatch(updateProfile(data, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditMyProfile);

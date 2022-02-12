import React, { memo, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { ENDPOINT } from 'shared/constants/endpoint';
import { CookiesStorage } from 'shared/configs/cookie';
import avatarError from 'assets/images/avatarError.png';
import saga from 'containers/Auth/saga';
import reducer from 'containers/Auth/reducer';
import { makeSelectMyProfile } from 'containers/Auth/selectors';
import { removeToken, getProfile } from 'containers/Auth/actions';
import Img from 'components/Img';
import messages from 'components/HeaderUserMenu/messages';
import { useDetectOutsideClick } from 'components/HeaderUserMenu/useDetectOutsideClick';

const key = 'auth';
const { ROUTING } = ENDPOINT;

function HeaderUserMenu({ onRemoveToken, dataProfile, onGetMyProfile }) {
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onClick = () => setIsActive(!isActive);

  const handleLogout = () => {
    onRemoveToken();
    CookiesStorage.clearCookieData('layoutEmployee');
    window.location.reload();
  };

  useEffect(() => {
    onGetMyProfile();
  }, []);

  return (
    <div className="header-user">
      <div
        onClick={onClick}
        className="menu-trigger employee mx-2"
        role="button"
      >
        <a src="" className="d-flex align-items-center cursor-pointer">
          <span className="employee__avatar">
            <Img
              className="avatar"
              src={dataProfile.profile?.avatar || ''}
              alt="employee avatar"
              onError={e => {
                e.target.onerror = null;
                e.target.src = avatarError;
              }}
            />
          </span>
          <span>
            <h3 className="employee__name">
              {dataProfile.profile?.fullName || ''}
            </h3>
            <p className="text-muted m-0 employee__email">
              {dataProfile.profile?.email || ''}
            </p>
          </span>
        </a>
      </div>

      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? 'active' : 'inactive'}`}
      >
        <ul>
          <li>
            <a src="" className="d-flex align-items-center cursor-pointer">
              <span className="employee-image">
                <Img
                  className="avatar"
                  src={dataProfile.profile?.avatar || ''}
                  alt="employee avatar"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = avatarError;
                  }}
                />
              </span>
              <span>
                <h3 className="employee-name">
                  {dataProfile.profile?.fullName || ''}
                </h3>
                <p className="text-muted m-0 employee-email">
                  {dataProfile.profile?.email || ''}
                </p>
              </span>
            </a>
          </li>
          <li>
            <Link
              to={ROUTING.MY_PROFILE}
              onClick={onClick}
              className={clsx(
                `${pathname.includes('my-profile') && 'active-nav'}`,
              )}
            >
              <FormattedMessage {...messages.myProfile} />
            </Link>
          </li>
          <li>
            <a href onClick={handleLogout} className="cursor-pointer">
              <FormattedMessage {...messages.signOut} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onRemoveToken: () => dispatch(removeToken()),
    onGetMyProfile: () => dispatch(getProfile()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HeaderUserMenu);

import React, { memo, useEffect } from 'react';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { ENDPOINT } from 'shared/constants/endpoint';
import { CookiesStorage } from 'shared/configs/cookie';
import { optionsLanguage } from 'shared/constants/common';
import { LANGUAGE_DEFAULT } from 'shared/constants/commonValues';
import { Login } from 'containers/Auth/SignIn';
import messages from 'containers/Auth/messages';
import LoginSuccess from 'containers/Auth/SignIn/loginSuccess';
import { changeLocale } from 'containers/LanguageProvider/actions';
import Logo from 'components/Logo';
import DropdownBox from 'components/DropdownBox';

const { ROUTING } = ENDPOINT;

function AuthPage({ onLocaleToggle }) {
  const intl = useIntl();
  const { pathname } = useLocation();
  const messageError = intl.formatMessage({ ...messages.loginFailure });
  const multipleLanguage =
    CookiesStorage.getCookieData('language') || LANGUAGE_DEFAULT;

  const idx = optionsLanguage.findIndex(el => el.value === multipleLanguage);

  useEffect(() => {
    document.body.classList.add('bg-white');
    return () => {
      document.body.classList.remove('bg-white');
    };
  }, []);

  const handleCallBackGetItem = dataLanguage => {
    CookiesStorage.setCookieData('language', dataLanguage);
    onLocaleToggle(dataLanguage);
  };

  pathname.includes('failure') &&
    toast.error(messageError, {
      position: 'top-center',
    });

  return (
    <>
      {pathname.includes(ROUTING.LOGIN_SUCCESS) ? (
        <Route path={ROUTING.LOGIN_SUCCESS} component={LoginSuccess} />
      ) : (
        <>
          <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed login-page">
            <div className=" auth-language d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
              <div className="auth-language-dropdown dropdown-language">
                <DropdownBox
                  options={optionsLanguage}
                  className="select-language"
                  language
                  defaultValue={optionsLanguage[idx]}
                  handleCallBackGetItem={handleCallBackGetItem}
                />
              </div>
              <Logo />
              <div className="w-lg-600px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto mt-5">
                <Switch>
                  <Route path={ROUTING.LOGIN} component={Login} />
                  <Redirect from={ROUTING.AUTH} to={ROUTING.LOGIN} />
                  <Redirect to={ROUTING.LOGIN} />
                </Switch>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: value => dispatch(changeLocale(value)),
  };
}
const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AuthPage);

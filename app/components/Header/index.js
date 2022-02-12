import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { CookiesStorage } from 'shared/configs/cookie';
import { optionsLanguage } from 'shared/constants/common';
import { LANGUAGE_DEFAULT } from 'shared/constants/commonValues';
import { changeLocale } from 'containers/LanguageProvider/actions';
import SearchInput from 'components/Search';
import DropdownBox from 'components/DropdownBox';
import messages from 'components/Header/messages';
import HeaderUserMenu from 'components/HeaderUserMenu';
import SearchSuggestions from 'components/SearchSuggestions';

function Header({ headerTitle, onLocaleToggle }) {
  const { pathname } = useLocation();
  const isProfile = pathname.includes('my-profile');
  const multipleLanguage =
    CookiesStorage.getCookieData('language') || LANGUAGE_DEFAULT;

  const idx = optionsLanguage.findIndex(el => el.value === multipleLanguage);

  const handleCallBackGetItem = dataLanguage => {
    CookiesStorage.setCookieData('language', dataLanguage);
    onLocaleToggle(dataLanguage);
  };

  useEffect(() => {
    onLocaleToggle(multipleLanguage);
  }, []);

  const showSearchSuggest =
    pathname.includes('employee-detail') ||
    pathname.includes('employee-edit') ||
    pathname.includes('employee-new');

  return (
    <div id="kt_header" className="header">
      <div
        className="
        container-fluid
        d-flex
        align-items-center
        justify-content-between
        p-0
      "
        id="kt_header_container"
      >
        <div
          className="
          page-title
          d-flex
          flex-column
          align-items-start
          justify-content-center
          flex-wrap
          me-lg-2
          pb-5 pb-lg-0
        "
        >
          <h2 className="d-flex flex-column my-0 header__title">
            {isProfile ? (
              <FormattedMessage {...messages.titleMyProfile} />
            ) : (
              headerTitle
            )}
            <small className="header__content fs-6 ms-1 pt-1">
              <FormattedMessage {...messages.content} />
            </small>
          </h2>
        </div>
        <div className="d-flex d-lg-none align-items-center ms-n2 me-2">
          <div
            className="btn btn-icon btn-active-icon-primary"
            id="kt_aside_toggle"
          >
            <span className="svg-icon svg-icon-1 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="74"
                height="74"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                  fill="black"
                />
                <path
                  opacity="0.3"
                  d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="header__search">
          {showSearchSuggest ? <SearchSuggestions /> : <SearchInput />}
        </div>
        <HeaderUserMenu />
        <div>
          <DropdownBox
            options={optionsLanguage}
            className="select-language"
            language
            defaultValue={optionsLanguage[idx]}
            handleCallBackGetItem={handleCallBackGetItem}
          />
        </div>
      </div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: value => dispatch(changeLocale(value)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Header);

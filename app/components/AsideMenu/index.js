import React, { memo } from 'react';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { scrollToTop, removeEmpty } from 'utils/common';
import { ENDPOINT } from 'shared/constants/endpoint';
import { CookiesStorage } from 'shared/configs/cookie';
import { ROLES } from 'shared/constants/common';
import {
  iconAsideMenuDashboard,
  iconAsideMenuEmployee,
  iconAsideMEnuEvaluation,
  iconAsideMenuExamination,
} from 'shared/constants/commonIcon';
import {
  LAYOUT_VERTICAL,
  LIMIT_PAGE_HORIZONTAL,
  LIMIT_PAGE_VERTICAL,
} from 'shared/constants/commonValues';
import { makeSelectMyProfile } from 'containers/Auth/selectors';
import saga from 'containers/EmployeePage/saga';
import reducer from 'containers/EmployeePage/reducer';
import { getDataEmployee } from 'containers/EmployeePage/actions';
import { saveTextSearch } from 'containers/App/actions';
import Logo from 'components/Logo';
import messages from 'components/AsideMenu/messages';

const queryString = require('query-string');
const { ROUTING } = ENDPOINT;
const key = 'employee';

function AsideMenu({
  changeHeaderTitle,
  onSaveTextSearch,
  dataProfile,
  onGetDataEmployee,
}) {
  const intl = useIntl();
  const history = useHistory();
  const { pathname, search } = useLocation();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const messageDashboard = intl.formatMessage({ ...messages.dashboard });
  const messageEmployee = intl.formatMessage({ ...messages.employee });
  const messageEvaluation = intl.formatMessage({ ...messages.evaluation });
  const messageExamination = intl.formatMessage({ ...messages.examination });

  const textEmployeeList = intl.formatMessage({ ...messages.employeeList });
  const textEmployeeDetail = intl.formatMessage({ ...messages.employeeDetail });
  const textNewEmployee = intl.formatMessage({ ...messages.newEmployee });
  const textEvaluation = intl.formatMessage({ ...messages.evaluation });
  const textExaminationList = intl.formatMessage({
    ...messages.examinationList,
  });
  const textEditEmployee = intl.formatMessage({
    ...messages.editEmployee,
  });

  const handleChangeTitleHeader = (location, dataCheck) => {
    if (!pathname.includes('employee-list')) {
      onSaveTextSearch('');
    }

    for (let i = 0; i < dataCheck.length; i++) {
      if (location.pathname.includes(dataCheck[i].pathname)) {
        changeHeaderTitle(dataCheck[i].changeText);
        return true;
      }
    }
  };

  const handleCallEmployeeList = () => {
    const defautLimitPage = LIMIT_PAGE_VERTICAL;
    const limitPage =
      CookiesStorage.getCookieData('layoutEmployee') === LAYOUT_VERTICAL
        ? LIMIT_PAGE_VERTICAL
        : LIMIT_PAGE_HORIZONTAL;

    if (search) {
      const data = {
        page: 1,
        limit: CookiesStorage.getCookieData('layoutEmployee')
          ? limitPage
          : defautLimitPage,
        type: 1,
        textSearch: '',
      };

      onGetDataEmployee(data);
      scrollToTop();
      onSaveTextSearch('');
      const dataRemoveEmpty = removeEmpty(data);
      history.push({
        pathname: ROUTING.EMPLOYEE_LIST,
        search: queryString.stringify(dataRemoveEmpty),
      });
    }
  };

  return (
    <div id="aside" className="aside py-9">
      <div className="aside-logo flex-column-auto px-9 mb-9" id="aside_logo">
        <Logo />
      </div>
      <div className="aside-menu ps-5 pe-3 mb-9" id="aside_menu">
        <div
          className="w-100 hover-scroll-overlay-y d-flex pe-2"
          id="aside_menu_wrapper"
        >
          <div className="menu menu-column menu-rounded fw-bold my-auto">
            <div className="menu-item">
              <NavLink
                to={ROUTING.DASHBOARD}
                className="menu-link"
                activeClassName="active"
                isActive={(match, location) => {
                  const data = [
                    {
                      pathname: 'dashboard',
                      changeText: messageDashboard,
                    },
                  ];
                  return handleChangeTitleHeader(location, data);
                }}
              >
                {iconAsideMenuDashboard}
                <span className="menu-title">{messageDashboard}</span>
              </NavLink>
            </div>
            {/* {dataProfile?.profile?.role === ROLES.ADMIN && (
              <div
                className="menu-item"
                role="button"
                onClick={handleCallEmployeeList}
              >
                <NavLink
                  to={ROUTING.EMPLOYEE_LIST}
                  className="menu-link"
                  activeClassName="active"
                  isActive={(match, location) => {
                    const data = [
                      {
                        pathname: 'employee-list',
                        changeText: textEmployeeList,
                      },
                      {
                        pathname: 'employee-edit',
                        changeText: textEditEmployee,
                      },
                      {
                        pathname: 'employee-detail',
                        changeText: textEmployeeDetail,
                      },
                      {
                        pathname: 'employee-new',
                        changeText: textNewEmployee,
                      },
                    ];
                    return handleChangeTitleHeader(location, data);
                  }}
                >
                  {iconAsideMenuEmployee}
                  <span className="menu-title">{messageEmployee}</span>
                </NavLink>
              </div>
            )} */}
            {/* <div className="menu-item">
              <NavLink
                to={ROUTING.EVALUATION}
                className="menu-link"
                activeClassName="active"
                isActive={(match, location) => {
                  const data = [
                    {
                      pathname: 'evaluation',
                      changeText: textEvaluation,
                    },
                  ];
                  return handleChangeTitleHeader(location, data);
                }}
              >
                {iconAsideMEnuEvaluation}

                <span className="menu-title">{messageEvaluation}</span>
              </NavLink>
            </div> */}
            <div className="menu-item">
              <NavLink
                to={ROUTING.EXAMINATION_LIST}
                className="menu-link"
                activeClassName="active"
                isActive={(match, location) => {
                  const data = [
                    {
                      pathname: 'sumarization',
                      changeText: textExaminationList,
                    },
                  ];
                  return handleChangeTitleHeader(location, data);
                }}
              >
                {iconAsideMenuExamination}
                <span className="menu-title">{messageExamination}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  dataProfile: makeSelectMyProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSaveTextSearch: data => dispatch(saveTextSearch(data)),
    onGetDataEmployee: data => dispatch(getDataEmployee(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AsideMenu);

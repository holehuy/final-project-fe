import React, { memo, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createStructuredSelector } from 'reselect';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { scrollToTop, removeEmpty } from 'utils/common';
import { ENDPOINT } from 'shared/constants/endpoint';
import { CookiesStorage } from 'shared/configs/cookie';
import {
  iconAdd,
  iconLayoutHorizontal,
  iconLayoutVertical,
} from 'shared/constants/commonIcon';
import {
  TYPE_NEWEST_EMPLOYEES,
  LAYOUT_HORIZONTAL,
  LAYOUT_VERTICAL,
  LIMIT_PAGE_HORIZONTAL,
  LIMIT_PAGE_VERTICAL,
  LAYOUT_EMPLOYEE,
} from 'shared/constants/commonValues';
import saga from 'containers/EmployeePage/saga';
import reducer from 'containers/EmployeePage/reducer';
import messages from 'containers/EmployeePage/messages';
import { makeSelectTextSearch } from 'containers/App/selectors';
import EmployeeInformation from 'containers/EmployeePage/EmployeeItem';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { saveTextSearch } from 'containers/App/actions';
import {
  getDataEmployee,
  getEmployeeTypes,
  deleteEmployeeId,
} from 'containers/EmployeePage/actions';
import {
  makeSelectDataEmployee,
  makeSelectEmployeeLoading,
  makeSelectEmployeeError,
  makeSelectEmployeeTypes,
  makeSelectDeleteEmployee,
} from 'containers/EmployeePage/selectors';
import Button from 'components/Button';
import DropdownBox from 'components/DropdownBox';
import PaginationComponent from 'components/Pagination';
import EmployeeLoader from 'components/ContentLoader/EmployeeLoader';

const queryString = require('query-string');

const { ROUTING } = ENDPOINT;
const key = 'employee';

function Employee({
  textSearch,
  loading,
  dataEmployee,
  dataTypes,
  languageState,
  onGetDataEmployee,
  onGetEmployeeTypes,
  deleteEmployee,
  onDeleteEmployee,
  onSaveTextSearch,
}) {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const objUrlParams = Object.fromEntries(new URLSearchParams(location.search));
  const labelButton = intl.formatMessage({ ...messages.buttonNewEmployee });
  const numberPage =
    LAYOUT_EMPLOYEE === LAYOUT_VERTICAL
      ? LIMIT_PAGE_VERTICAL
      : LIMIT_PAGE_HORIZONTAL;

  const [page, setPage] = useState(1);
  const [type, setType] = useState(TYPE_NEWEST_EMPLOYEES);
  const [isActive, setIsActive] = useState(
    CookiesStorage.getCookieData('layoutEmployee') || 'vertical',
  );
  const [numberLimitPage, setNumberLimitPage] = useState(numberPage);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onChangeLayout = index => {
    CookiesStorage.setCookieData('layoutEmployee', index);
    setIsActive(index);
  };

  const getDataEmployeeList = queryParams => {
    onGetDataEmployee(queryParams);
    scrollToTop();
  };

  const getDataAfterDelete = () => {
    const data = {
      page,
      limit: numberLimitPage,
      type,
      textSearch,
    };
    const checkPagination =
      dataEmployee.pagination.perPage === 1 &&
      dataEmployee.pagination.total > 1;
    if (checkPagination) {
      data.page -= 1;
      setPage(page - 1);
      getDataEmployeeList(data);
    } else {
      getDataEmployeeList(data);
    }
    toast.success(intl.formatMessage({ ...messages.deleteSuccess }));
  };

  const handleCallbackPage = value => {
    setPage(value);
  };

  const handleCallBackGetItem = value => {
    setType(value);
  };

  const loadingLength = (length, fn) => Array.from({ length }, (_, i) => fn(i));

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  const handleUrlParamsEmployee = params => {
    const dataRemoveEmpty = removeEmpty(params);
    history.push({
      pathname: ROUTING.EMPLOYEE_LIST,
      search: queryString.stringify(dataRemoveEmpty),
    });
    getDataEmployeeList(params);
  };

  useEffect(() => {
    isActive === LAYOUT_VERTICAL
      ? setNumberLimitPage(LIMIT_PAGE_VERTICAL)
      : setNumberLimitPage(LIMIT_PAGE_HORIZONTAL);
  }, [isActive]);

  useDidMountEffect(() => {
    const data = {
      page,
      limit: numberLimitPage,
      type,
      textSearch: objUrlParams.textSearch || '',
    };
    onSaveTextSearch(objUrlParams.textSearch || '');
    const totalPage = Math.ceil(
      dataEmployee.pagination.total / numberLimitPage,
    );
    if (totalPage < page) {
      data.page = totalPage;
      setPage(totalPage);
      handleUrlParamsEmployee(data);
    } else {
      handleUrlParamsEmployee(data);
    }
  }, [page, type, numberLimitPage]);

  useDidMountEffect(() => {
    if (textSearch !== objUrlParams.textSearch) {
      const data = {
        page: 1,
        limit: numberLimitPage,
        type,
        textSearch,
      };
      handleUrlParamsEmployee(data);
    }
  }, [textSearch]);

  useEffect(() => {
    if (Object.keys(objUrlParams).length === 0) {
      const data = {
        page: 1,
        limit: numberLimitPage,
        type,
        textSearch: '',
      };
      handleUrlParamsEmployee(data);
    } else {
      setNumberLimitPage(objUrlParams.limit || numberLimitPage);
      setPage(objUrlParams.page || 1);
      const index = dataTypes?.data?.findIndex(
        el => el.value === objUrlParams.type,
      );
      setType(index === -1 ? TYPE_NEWEST_EMPLOYEES : objUrlParams.type);
    }
  }, []);

  useEffect(() => {
    onGetEmployeeTypes(languageState);
  }, [languageState]);

  return (
    <div className="employee-page">
      <div className="employee-page__header">
        <div className="employee-page__button">
          <Link to={ROUTING.EMPLOYEE_NEW}>
            <Button
              className="button-add"
              buttonName={labelButton}
              icon={iconAdd}
            />
          </Link>
        </div>
        <div className="right">
          <div className="employee-page__filter">
            {!dataTypes?.isFetching && dataTypes?.data?.length ? (
              <DropdownBox
                options={dataTypes.data}
                defaultValue={() => {
                  const index = dataTypes.data.findIndex(
                    el => el.value === parseInt(type, 10),
                  );
                  if (index === -1) {
                    return dataTypes.data[0];
                  }
                  return dataTypes.data[index];
                }}
                handleCallBackGetItem={handleCallBackGetItem}
                className="dropdown-default filter-employee"
              />
            ) : null}
          </div>
          <div className="employee-page__change-layout">
            <button
              className={clsx(
                'horizontal icon-layout',
                isActive === LAYOUT_HORIZONTAL ? 'active' : '',
              )}
              type="button"
              onClick={() => onChangeLayout(LAYOUT_HORIZONTAL)}
            >
              {iconLayoutHorizontal}
            </button>
            <button
              className={clsx(
                'vertical icon-layout',
                isActive === LAYOUT_VERTICAL ? 'active' : '',
              )}
              type="button"
              onClick={() => onChangeLayout(LAYOUT_VERTICAL)}
            >
              {iconLayoutVertical}
            </button>
          </div>
        </div>
      </div>
      <div className="employee-page__list">
        <div className="row gy-5 g-xl-8">
          {loading
            ? loadingLength(numberLimitPage, i => (
                <EmployeeLoader key={`loading${i}`} className={isActive} />
              ))
            : dataEmployee?.data?.map((el, idx) => (
                <EmployeeInformation
                  dataEmployee={el}
                  key={`employee-item${idx}`}
                  className={isActive}
                  deleteEmployee={deleteEmployee}
                  onDeleteEmployee={onDeleteEmployee}
                  getDataAfterDelete={getDataAfterDelete}
                />
              ))}
        </div>
      </div>
      {dataEmployee?.pagination.total &&
      dataEmployee?.pagination.lastPage >=
        dataEmployee?.pagination.currentPage ? (
        <div className="employee-page__pagination">
          <PaginationComponent
            handleCallbackPage={handleCallbackPage}
            pageCount={dataEmployee?.pagination?.total || 0}
            limit={numberLimitPage}
            showLengthData={dataEmployee?.pagination?.perPage}
            activePage={dataEmployee?.pagination?.currentPage}
            lastPage={dataEmployee?.pagination?.lastPage}
          />
        </div>
      ) : (
        <div className="no-data fst-italic text-muted text-center">
          <p>{intl.formatMessage({ ...messages.noData })}</p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  textSearch: makeSelectTextSearch(),
  dataEmployee: makeSelectDataEmployee(),
  loading: makeSelectEmployeeLoading(),
  error: makeSelectEmployeeError(),
  dataTypes: makeSelectEmployeeTypes(),
  deleteEmployee: makeSelectDeleteEmployee(),
  languageState: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetDataEmployee: data => dispatch(getDataEmployee(data)),
    onGetEmployeeTypes: dataLanguage =>
      dispatch(getEmployeeTypes(dataLanguage)),
    onDeleteEmployee: (id, callback) =>
      dispatch(deleteEmployeeId(id, callback)),
    onSaveTextSearch: data => dispatch(saveTextSearch(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Employee);

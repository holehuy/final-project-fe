import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { compose } from 'redux';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import Autosuggest from 'react-autosuggest';
import { createStructuredSelector } from 'reselect';
import avatarError from 'assets/images/avatarError.png';
import { saveTextSearch } from 'containers/App/actions';
import { makeSelectTextSearch } from 'containers/App/selectors';
import { getSearchSuggestEmployee } from 'containers/EmployeePage/actions';
import { makeSelectSearchEmployeeSuggest } from 'containers/EmployeePage/selectors';
import Img from 'components/Img';
import messages from 'components/Search/messages';

function SearchSuggestions({
  textSearch,
  onSaveTextSearch,
  dataSearchEmployee,
  onGetSearchSuggestEmployee,
}) {
  const intl = useIntl();
  const loader = useRef(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const [page, setPage] = useState(1);
  const checkUrlEmployeeEdit = pathname.includes('employee-edit');
  const checkUrlEmployeeDetail = pathname.includes('employee-detail');
  const checkUrlNewEmployee = pathname.includes('employee-new');

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) func();
      else didMount.current = true;
    }, deps);
  };

  useEffect(() => {
    if (page <= dataSearchEmployee?.pagination?.lastPage) {
      const data = {
        page,
        textSearch,
      };
      onGetSearchSuggestEmployee(data);
    }
  }, [page]);

  useDidMountEffect(() => {
    setPage(1);
    const data = {
      page: 1,
      textSearch,
    };
    onGetSearchSuggestEmployee(data);
  }, [textSearch.trim()]);

  const onChange = (event, { newValue }) => {
    !newValue.id && onSaveTextSearch(newValue);
    if (event.key === 'Enter') {
      if (checkUrlEmployeeEdit) {
        history.push(`/employee-edit/${newValue.id}`);
      } else if (checkUrlEmployeeDetail || checkUrlNewEmployee) {
        history.push(`/employee-detail/${newValue.id}`);
      }
    }
  };

  const onSuggestionsFetchRequested = () => {};
  const onSuggestionsClearRequested = () => {};

  const getSuggestionValue = suggestion => {
    const lastIndex = dataSearchEmployee.data.length;
    if (suggestion?.id === dataSearchEmployee?.data[lastIndex - 1]?.id) {
      setPage(prev => prev + 1);
    }
    return suggestion;
  };

  function renderSuggestionsContainer({ containerProps, children }) {
    return (
      <div {...containerProps}>
        {children}
        {dataSearchEmployee?.isFetching && (
          <div className="my-5 text-center">
            <div className="spinner-border text-primary" role="status" />
          </div>
        )}
        <div ref={loader} />
      </div>
    );
  }

  const inputProps = {
    placeholder: intl.formatMessage({ ...messages.placeholder }),
    value: textSearch,
    onChange,
  };

  const renderSuggestion = suggestion => (
    <>
      {pathname.includes('employee') ? (
        <div className="suggestion-employee">
          <Link
            to={
              (checkUrlEmployeeEdit && `/employee-edit/${suggestion.id}`) ||
              ((checkUrlEmployeeDetail || checkUrlNewEmployee) &&
                `/employee-detail/${suggestion.id}`)
            }
            className="d-flex align-items-center cursor-pointer"
          >
            <span className="suggestion-employee__avatar">
              <Img
                className="avatar"
                src={suggestion.avatar || ''}
                alt="employee avatar"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = avatarError;
                }}
              />
            </span>
            <span>
              <h3 className="suggestion-employee__name">
                {suggestion.fullName}
              </h3>
              <p className="text-muted m-0 suggestion-employee__email">
                {suggestion.email}
              </p>
            </span>
          </Link>
        </div>
      ) : null}
    </>
  );

  const handleObserver = useCallback(entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prev => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="search-suggestions">
      <Autosuggest
        suggestions={dataSearchEmployee?.data || []}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
      />
      <Search size={22} className="icon-search" />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  textSearch: makeSelectTextSearch(),
  dataSearchEmployee: makeSelectSearchEmployeeSuggest(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onGetSearchSuggestEmployee: data =>
      dispatch(getSearchSuggestEmployee(data)),
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
)(SearchSuggestions);

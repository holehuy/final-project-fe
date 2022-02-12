import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Search } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { saveTextSearch } from 'containers/App/actions';
import { makeSelectTextSearch } from 'containers/App/selectors';
import messages from 'components/Search/messages';

function SearchInput({ onSaveTextSearch, textSearchState }) {
  const handleChange = e => {
    onSaveTextSearch(e.target.value);
  };

  return (
    <div className="form-group search">
      <div className="input-icon input-icon-right">
        <FormattedMessage {...messages.placeholder}>
          {msg => (
            <>
              <input
                value={textSearchState}
                type="text"
                className="form-control"
                placeholder={msg}
                onChange={handleChange}
              />
              <Search size={22} className="icon-search" />
            </>
          )}
        </FormattedMessage>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  textSearchState: makeSelectTextSearch(),
});

export function mapDispatchToProps(dispatch) {
  return {
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
)(SearchInput);

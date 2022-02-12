import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/EmployeePage/EmployeeDetail/messages';
import PassedTestItem from 'containers/EmployeePage/EmployeeDetail/PassedTest/PassedTestItem';
function PassedTest() {
  return (
    <div className="col-4">
      <div className="passed-test common-infor">
        <div className="passed-test__header">
          <h3 className="passed-test__title">
            <FormattedMessage {...messages.passedTest} />
          </h3>
          <p className="passed-test__content">
            Maiores dicta atque dolorem temporibus
          </p>
        </div>
        <div className="passed-test__list">
          <PassedTestItem />
          <PassedTestItem />
          <PassedTestItem />
          <PassedTestItem />
        </div>
      </div>
    </div>
  );
}

export default PassedTest;

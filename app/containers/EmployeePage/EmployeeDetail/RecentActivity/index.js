import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'containers/EmployeePage/EmployeeDetail/messages';
import RecentActivityItem from 'containers/EmployeePage/EmployeeDetail/RecentActivity/RecentActivityItem';
function RecentActivity() {
  return (
    <div className="col-4">
      <div className="recent-activity common-infor">
        <div className="recent-activity__header">
          <h3 className="recent-activity__title">
            <FormattedMessage {...messages.recentActivity} />
          </h3>
          <p className="recent-activity__content">
            Maiores dicta atque dolorem temporibus
          </p>
        </div>

        <ul className="recent-activity__timeline">
          <RecentActivityItem />
          <RecentActivityItem />
          <RecentActivityItem />
        </ul>
      </div>
    </div>
  );
}

export default RecentActivity;

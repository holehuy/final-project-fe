import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import messages from 'containers/EmployeePage/EmployeeDetail/messages';
import RadarChart from 'components/RadarChart';

function EmployeeEvaluation() {
  const intl = useIntl();
  const data = {
    labels: [
      intl.formatMessage({ ...messages.autonomy }),
      intl.formatMessage({ ...messages.knowledge }),
      intl.formatMessage({ ...messages.businessSkill }),
      intl.formatMessage({ ...messages.punctuality }),
      intl.formatMessage({ ...messages.complexity }),
      intl.formatMessage({ ...messages.influence }),
    ],
    datasets: [
      {
        label: intl.formatMessage({ ...messages.selfEvaluation }),
        data: [65, 59, 90, 81, 56, 55],

        backgroundColor: 'rgba(239, 93, 168, 0.2)',
        borderColor: 'rgb(239, 93, 168)',
        pointBackgroundColor: 'rgb(239, 93, 168)',
      },
      {
        label: intl.formatMessage({ ...messages.teamEvaluation }),
        data: [28, 100, 40, 54, 96, 27],
        backgroundColor: 'rgba(93, 95, 239, 0.2)',
        borderColor: 'rgb(93, 95, 239)',
        pointBackgroundColor: 'rgb(93, 95, 239)',
      },
    ],
  };

  return (
    <div className="col-4">
      <div className="employee-evaluation common-infor">
        <div className="employee-evaluation__header">
          <h3 className="employee-evaluation__title">
            <FormattedMessage {...messages.evaluation} />
          </h3>
          <p className="employee-evaluation__content">
            Maiores dicta atque dolorem temporibus
          </p>
        </div>
        <div className="employee-evaluation__radar-chart">
          <RadarChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default EmployeeEvaluation;

import React from 'react';
import { useIntl } from 'react-intl';
import messages from 'containers/NotFoundPage/messages';

function NotFound() {
  const intl = useIntl();
  return (
    <div>
      <h1 className="fw-bolder fs-4x text-gray-700 mb-10">
        {intl.formatMessage({ ...messages.titleNotFound })}
      </h1>
    </div>
  );
}

export default NotFound;

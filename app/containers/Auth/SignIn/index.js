import React from 'react';
import { FormattedMessage } from 'react-intl';
import { API_BASE_URL } from 'shared/configs/setting';
import { ENDPOINT } from 'shared/constants/endpoint';
import { iconGoogle, iconFacebook } from 'shared/constants/commonIcon';
import messages from 'containers/Auth/SignIn/messages';

const { ROUTING } = ENDPOINT;

export function Login() {
  const handleSubmit = () => { };
  return (
    <form
      className="form w-100"
      onSubmit={handleSubmit}
      noValidate
      id="login-form"
    >
      <div className="text-center mb-10">
        <h1 className="text-dark mb-3">
          <FormattedMessage {...messages.title} />
        </h1>
      </div>

      <a
        href={`${API_BASE_URL}${ROUTING.LOGIN_WITH_GOOGLE}`}
        className="btn btn-flex flex-center btn-light btn-lg w-100 mb-5 fw-normal"
      >
        {iconGoogle}
        <FormattedMessage {...messages.loginWithGoogle} />
      </a>
    </form>
  );
}

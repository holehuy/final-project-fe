import React from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { ENDPOINT } from 'shared/constants/endpoint';
import NotFound from 'containers/NotFoundPage';
import Logo from 'components/Logo';
import messages from 'components/Errors/messages';

const { ROUTING } = ENDPOINT;

function ErrorsPage() {
  const history = useHistory();
  const redirectToDashboard = () => {
    history.push(ROUTING.DASHBOARD);
  };
  const intl = useIntl();

  return (
    <div className="not-found">
      <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
        <div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-20">
          <Logo />
          <div className="pt-lg-10 mb-10">
            <Switch>
              <Route path={ROUTING.ERROR_404} exact>
                <NotFound />
              </Route>
              <Redirect from={ROUTING.ERROR} exact to={ROUTING.ERROR_404} />
              <Redirect to={ROUTING.ERROR_404} />
            </Switch>
            <div className="text-center">
              <a
                href
                onClick={redirectToDashboard}
                className="btn btn-lg btn-primary fw-bolder"
              >
                {intl.formatMessage({ ...messages.buttonGoBack })}
              </a>
            </div>
          </div>
          <div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px background" />
        </div>
      </div>
    </div>
  );
}

export default ErrorsPage;

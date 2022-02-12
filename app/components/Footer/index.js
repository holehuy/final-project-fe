import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

function Footer() {
  return (
    <div className="footer-container">
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <a href="https://twitter.com/mxstbr">Max Stoiber</a>,
          }}
        />
      </section>
    </div>
  );
}

export default Footer;

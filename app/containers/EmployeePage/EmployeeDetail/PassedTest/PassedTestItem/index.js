import React from 'react';
import avatarError from 'assets/images/AvatarPassedTestError.png';
import { iconMenu } from 'shared/constants/commonIcon';
import Img from 'components/Img';

function PassedTestItem() {
  return (
    <div className="passed-test-item">
      <div className="passed-test-item__infor">
        <div className="passed-test-item__avatar">
          <Img
            className="avatar"
            src=""
            alt="passe avatar"
            onError={e => {
              e.target.onerror = null;
              e.target.src = avatarError;
            }}
          />
        </div>
        <div className="passed-test-item__header">
          <h4 className="passed-test-item__title">Git Flow Basic Knowledge</h4>
          <p className="passed-test-item__content m-0">
            lllum omnis quo illum nisi.
          </p>
        </div>
      </div>
      <div className="passed-test-item__menu">{iconMenu}</div>
    </div>
  );
}

export default PassedTestItem;

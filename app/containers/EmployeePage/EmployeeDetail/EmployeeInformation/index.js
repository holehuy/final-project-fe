import React from 'react';
import { Link } from 'react-router-dom';
import avatarError from 'assets/images/AvatarEmployeeDetailError.png';
import { ENDPOINT } from 'shared/constants/endpoint';
import {
  iconAddress,
  iconEditLayoutHorizontal,
  iconEmail,
  iconPhoneNumber,
} from 'shared/constants/commonIcon';
import Img from 'components/Img';

const { ROUTING } = ENDPOINT;

function EmployeeInfor({ data, profile }) {
  return (
    <div className="employee-infor">
      <div className="employee-infor__header">
        <div className="employee-infor__avatar">
          <Img
            className="avatar"
            src={profile?.avatar || data?.avatar || ''}
            alt="employee avatar"
            onError={e => {
              e.target.onerror = null;
              e.target.src = avatarError;
            }}
          />
        </div>
      </div>
      <div className="employee-infor__profile">
        <div className="employee-infor__personal">
          <h3 className="infor-name">
            {profile?.fullName || data?.fullName || ''}
          </h3>
          <p className="infor-position">
            {profile?.position || data?.position || '-'}
          </p>
        </div>
        <ul className="employee-infor__personal-list">
          <li className="infor-item infor-phone">
            <span className="icon-infor">{iconPhoneNumber}</span>
            <a href={`tel:${profile?.phoneNumber || data?.phoneNumber || ''}`}>
              {profile?.phoneNumber || data?.phoneNumber || ''}
            </a>
          </li>
          <li className="infor-item infor-email">
            <span className="icon-infor">{iconEmail}</span>
            <a href={`mailto:${profile?.email || data?.email || ''}`}>
              {profile?.email || data?.email || ''}
            </a>
          </li>
          <li className="infor-item">
            <span className="icon-infor">{iconAddress}</span>
            <span className="infor-address">
              {profile?.address || data?.address || ''}
            </span>
          </li>
        </ul>
      </div>
      <div className="employee-infor__menu">
        <Link
          className="button btn edit"
          to={
            profile
              ? `${ROUTING.EDIT_MY_PROFILE}`
              : `/employee-edit/${data?.id}`
          }
        >
          {iconEditLayoutHorizontal}
        </Link>
      </div>
    </div>
  );
}

export default EmployeeInfor;

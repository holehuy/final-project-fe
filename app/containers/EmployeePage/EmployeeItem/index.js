import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Modal } from 'reactstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import {
  iconCancel,
  iconMenu,
  iconMenuEdit,
  iconMenuDelete,
  iconPhoneNumber,
  iconEmail,
  iconAddress,
  iconEditLayoutHorizontal,
  iconDeleteLayoutHorizontal,
} from 'shared/constants/commonIcon';
import avatarError from 'assets/images/avatarError.png';
import messages from 'containers/EmployeePage/EmployeeItem/messages';
import Img from 'components/Img';
import Button from 'components/Button';
import { useDetectOutsideClick } from 'components/HeaderUserMenu/useDetectOutsideClick';
function ModalDelete({
  toggleModal,
  modal,
  fullName,
  deleteEmployee,
  onDeleteEmployee,
  idEmployee,
  onToggleIcon,
  getDataAfterDelete,
}) {
  const intl = useIntl();

  const handleDeleteEmployee = () => {
    const online = navigator.onLine;
    if (online) {
      onDeleteEmployee(idEmployee, getDataAfterDelete);
      if (!deleteEmployee.isFetching) {
        toggleModal();
        onToggleIcon();
      }
    } else {
      toast.error(intl.formatMessage({ ...messages.deleteFailure }));
      toggleModal();
    }
  };

  return (
    <div className="employee-modal">
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className="modal-delete-employee"
        centered
      >
        <div className="modal-delete">
          <div className="icon-cancel" onClick={toggleModal} role="button">
            {iconCancel}
          </div>
          <div className="header-delete">
            <h3>{intl.formatMessage({ ...messages.deleteEmployeeModal })}</h3>
          </div>
          <div className="content">
            <p>
              <FormattedMessage
                {...messages.ModalTitle}
                values={{
                  fullName: <strong>&#34;{`${fullName}`}&#34;</strong>,
                }}
              />
            </p>
            <p>{intl.formatMessage({ ...messages.ModelCancel })}</p>
          </div>
          <div className="actions">
            <Button
              className="button button-delete"
              onClick={handleDeleteEmployee}
              disabled={deleteEmployee.isFetching}
              isLoading={deleteEmployee.isFetching}
              buttonName={intl.formatMessage({ ...messages.buttonDelete })}
            />
            <Button
              className="button button-cancel"
              onClick={toggleModal}
              buttonName={intl.formatMessage({ ...messages.buttonCancel })}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function EmployeeInformation(props) {
  const intl = useIntl();
  const dropdownRef = useRef(null);
  const history = useHistory();
  const editEmployee = intl.formatMessage({ ...messages.editEmployee });
  const deleteEmployee = intl.formatMessage({ ...messages.deleteEmployee });

  const [modal, setModal] = useState(false);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onToggleIcon = () => setIsActive(!isActive);
  const toggleModal = () => setModal(!modal);

  const onClickMenu = e => {
    onToggleIcon();
    e.preventDefault();
    e.stopPropagation();
  };

  const onClickModalDelete = e => {
    toggleModal();
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLinkPage = () => {
    history.push(`/employee-detail/${props.dataEmployee.id}`);
  };

  const handleLinkEmployeeEdit = e => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/employee-edit/${props.dataEmployee.id}`);
  };

  return (
    <div
      className={clsx(
        props.className === 'vertical'
          ? 'vertical-layout col-xl-3 col-sm-4'
          : 'horizontal-layout col-12',
      )}
    >
      <div role="button" onClick={handleLinkPage}>
        <div className="employee-item">
          <div className="employee-item__header">
            <div className="employee-item__avatar">
              <Img
                className="avatar"
                src={props?.dataEmployee?.avatar || ''}
                alt="employee avatar"
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = avatarError;
                }}
              />
            </div>
            <div
              className={clsx(
                props.className === 'horizontal' && 'hidden-menu',
                'employee-item__menu',
                isActive && 'active-icon',
              )}
            >
              <div
                className="dropdown dropdown-inline"
                onClick={onClickMenu}
                role="button"
              >
                <button
                  type="button"
                  className="btn btn-icon btn-sm button-menu"
                >
                  {iconMenu}
                </button>
                <div
                  ref={dropdownRef}
                  className={clsx('dropdown-menu', isActive ? 'show' : '')}
                >
                  <Link
                    className="dropdown-item edit"
                    to={`/employee-edit/${props.dataEmployee.id}`}
                  >
                    {iconMenuEdit}
                    {editEmployee}
                  </Link>
                  <div
                    role="button"
                    className="dropdown-item delete cursor-pointer"
                    onClick={toggleModal}
                    href
                  >
                    {iconMenuDelete}
                    {deleteEmployee}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="employee-item__profile">
            <div className="employee-item__infor">
              <h3 className="infor-name">
                {props.dataEmployee?.fullName || '-'}
              </h3>
              <p className="infor-position">
                {props.dataEmployee?.position || '-'}
              </p>
            </div>
            <ul className="employee-item__infor-list">
              <li className="infor-item">
                <span className="icon-infor">{iconPhoneNumber}</span>
                <a href={`tel:${props.dataEmployee?.phoneNumber || ''}`}>
                  {props.dataEmployee?.phoneNumber || ''}
                </a>
              </li>
              <li className="infor-item">
                <span className="icon-infor">{iconEmail}</span>

                <a href={`mailto:${props.dataEmployee?.email || ''}`}>
                  {props.dataEmployee?.email || ''}
                </a>
              </li>
              <li className="infor-item">
                <span className="icon-infor">{iconAddress}</span>

                <span className="infor-address">
                  {props.dataEmployee?.address || ''}
                </span>
              </li>
            </ul>
          </div>
          <div
            className={clsx(
              props.className === 'horizontal'
                ? 'employee-menu'
                : 'hidden-menu',
            )}
          >
            <button
              className="button btn edit"
              type="button"
              onClick={handleLinkEmployeeEdit}
            >
              {iconEditLayoutHorizontal}
            </button>
            <button
              className="button btn delete"
              type="button"
              onClick={onClickModalDelete}
            >
              {iconDeleteLayoutHorizontal}
            </button>
          </div>
        </div>
      </div>
      <div>
        <ModalDelete
          toggleModal={toggleModal}
          modal={modal}
          idEmployee={props.dataEmployee?.id}
          fullName={props.dataEmployee?.fullName}
          deleteEmployee={props.deleteEmployee}
          onToggleIcon={onToggleIcon}
          onDeleteEmployee={props.onDeleteEmployee}
          getDataAfterDelete={props.getDataAfterDelete}
        />
      </div>
    </div>
  );
}

export default EmployeeInformation;

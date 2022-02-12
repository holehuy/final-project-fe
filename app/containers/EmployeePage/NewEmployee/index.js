import clsx from 'clsx';
import * as Yup from 'yup';
import { compose } from 'redux';
import React, { memo, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { createStructuredSelector } from 'reselect';
import { Link, useHistory } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';
import { removeEmpty } from 'utils/common';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import slack from 'assets/images/Slack.png';
import { ROLES } from 'shared/constants/common';
import { ENDPOINT } from 'shared/constants/endpoint';
import { iconBack } from 'shared/constants/commonIcon';
import { REGEX_PHONE, REGEX_MAIL_DOMAIN } from 'shared/constants/commonValues';
import {
  makeSelectUploadImage,
  makeSelectFetchSlack,
  makeSelectUpdateEmployee,
  makeSelectCreateEmployee,
} from 'containers/EmployeePage/selectors';
import saga from 'containers/EmployeePage/saga';
import reducer from 'containers/EmployeePage/reducer';
import {
  uploadAvatarEmployee,
  updateEmployeeDetail,
  getEmployeeDetail,
  fetchDataEmployeeSlack,
  createEmployee,
} from 'containers/EmployeePage/actions';
import Img from 'components/Img';
import Button from 'components/Button';
import UploadImage from 'components/UploadImage';
import InputField from 'components/FormControl/InputField';
import { useIntl } from 'react-intl';
import messages from 'containers/EmployeePage/NewEmployee/messages';

const { ROUTING } = ENDPOINT;
const key = 'employee';
const Slack = () => <Img className="icon-slack" src={slack} alt="logo slack" />;

function NewEmployeePage({
  data,
  onUploadAvatarEmployee,
  uploadAvatar,
  updateEmployee,
  onUpdateEmployeeDetail,
  dataSlack,
  onFetchDataEmployeeSlack,
  dataNewEmployee,
  onCreateEmployee,
  profile,
  onUpdateProfile,
  updateProfile,
}) {
  const intl = useIntl();
  const { pathname } = useLocation();
  const history = useHistory();
  const [isFile, setIsFile] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const checkUrlEdit = pathname.includes('employee-edit');
  const checkUrlNew = pathname.includes('employee-new');
  const checkUrlUpdateProfile = pathname.includes('edit-my-profile');

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(intl.formatMessage({ ...messages.validateName }))
      .max(255, intl.formatMessage({ ...messages.validateLength })),
    position: Yup.string()
      .required(intl.formatMessage({ ...messages.validatePosition }))
      .max(255, intl.formatMessage({ ...messages.validateLength })),
    phoneNumber: Yup.string()
      .required(intl.formatMessage({ ...messages.validatePhone }))
      .min(10, intl.formatMessage({ ...messages.validFormatPhone }))
      .max(11, intl.formatMessage({ ...messages.validFormatPhone }))
      .matches(
        REGEX_PHONE,
        intl.formatMessage({ ...messages.validFormatPhone }),
      ),
    email: Yup.string()
      .required(intl.formatMessage({ ...messages.validateEmail }))
      .email(intl.formatMessage({ ...messages.validFormatEmail }))
      .matches(
        REGEX_MAIL_DOMAIN,
        intl.formatMessage({ ...messages.validOrgEmail }),
      ),
    address: Yup.string()
      .required(intl.formatMessage({ ...messages.validateAddress }))
      .max(255, intl.formatMessage({ ...messages.validateLength })),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    setError,
    formState,
  } = useForm({
    ...formOptions,
    defaultValues: {
      fullName: profile?.fullName || data?.fullName || '',
      position: profile?.position || data?.position || '',
      email: profile?.email || data?.email || '',
      phoneNumber: profile?.phoneNumber || data?.phoneNumber || '',
      address: profile?.address || data?.address || '',
    },
  });

  const { errors } = formState;

  const onSubmit = dataForm => {
    const avatar = uploadAvatar?.urlUpload || '';
    if (avatar && isFile) {
      if (checkUrlEdit) {
        const dataEmployeeUpdate = {
          ...dataForm,
          avatar,
        };
        const dataRemoveEmpty = removeEmpty(dataEmployeeUpdate);
        onUpdateEmployeeDetail(
          data.id,
          dataRemoveEmpty,
          handleCallBackUpdateEmployee,
        );
      } else if (checkUrlNew) {
        const dataEmployee = {
          ...dataForm,
          avatar,
        };
        onCreateEmployee(dataEmployee, handleCallBackMessageCreateEmployee);
      } else if (checkUrlUpdateProfile) {
        const dataProfile = {
          fullName: dataForm.fullName,
          position: dataForm.position,
          phoneNumber: dataForm.phoneNumber,
          address: dataForm.address,
          avatar,
        };
        onUpdateProfile(dataProfile, handleCallBackUpdateProfile);
      }
    }
  };

  const handleCallBackUpdateEmployee = error => {
    if (error?.status === 409) {
      error?.data?.error.forEach(el => {
        if (el.field === 'email') {
          setError(
            'email',
            {
              type: 'focus',
              message: intl.formatMessage({ ...messages.emailUsed }),
            },
            {
              shouldFocus: true,
            },
          );
        }
        if (el.field === 'phoneNumber') {
          setError(
            'phoneNumber',
            {
              type: 'focus',
              message: intl.formatMessage({ ...messages.phoneUsed }),
            },
            {
              shouldFocus: true,
            },
          );
        }
      });
    } else if (error) {
      toast.error(intl.formatMessage({ ...messages.updateError }));
    } else {
      toast.success(intl.formatMessage({ ...messages.updateSuccess }));
      history.push(`/employee-detail/${data.id}`);
    }
  };

  const handleFetchDataSlack = () => {
    const email = getValues('email');
    const checkEmail = REGEX_MAIL_DOMAIN.test(email);
    const online = navigator.onLine;

    if (!online) {
      toast.error(intl.formatMessage({ ...messages.createNoInternet }));
    } else if (!email) {
      setError(
        'email',
        {
          type: 'focus',
          message: intl.formatMessage({ ...messages.validateEmail }),
        },
        {
          shouldFocus: true,
        },
      );
    } else if (checkEmail) {
      onFetchDataEmployeeSlack(email, handleCallBackMessageFetchSlack);
      clearErrors('');
    } else {
      setError(
        'email',
        {
          type: 'focus',
          message: intl.formatMessage({ ...messages.validFormatEmail }),
        },
        {
          shouldFocus: true,
        },
      );
    }
  };

  const handleCallBackMessageCreateEmployee = error => {
    if (error?.status === 409) {
      error?.data?.error.forEach(el => {
        if (el.field === 'email') {
          setError(
            'email',
            {
              type: 'focus',
              message: intl.formatMessage({ ...messages.emailUsed }),
            },
            {
              shouldFocus: true,
            },
          );
        }
        if (el.field === 'phoneNumber') {
          setError(
            'phoneNumber',
            {
              type: 'focus',
              message: intl.formatMessage({ ...messages.phoneUsed }),
            },
            {
              shouldFocus: true,
            },
          );
        }
      });
    } else if (error) {
      toast.error(intl.formatMessage({ ...messages.createError }));
    } else {
      toast.success(intl.formatMessage({ ...messages.createSuccess }));
      history.push('/employee-list');
    }
  };

  const handleCallBackMessageFetchSlack = error => {
    if (error) {
      toast.error(intl.formatMessage({ ...messages.fetchSlackError }));
    } else {
      toast.success(intl.formatMessage({ ...messages.fetchSlackSuccess }));
    }
  };

  const handleCallBackUpdateProfile = error => {
    if (error?.status === 400) {
      setError(
        'phoneNumber',
        {
          type: 'focus',
          message: intl.formatMessage({ ...messages.phoneUsed }),
        },
        {
          shouldFocus: true,
        },
      );
    } else if (error) {
      toast.error(intl.formatMessage({ ...messages.updateProfileError }));
    } else {
      toast.success(intl.formatMessage({ ...messages.updateProfileSuccess }));
      history.push('/my-profile');
    }
  };
  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  useDidMountEffect(() => {
    if (!dataSlack?.isFetching) {
      setValue('fullName', dataSlack?.data?.fullName || '');
      setValue('position', dataSlack?.data?.position || '');
      setValue('phoneNumber', dataSlack?.data?.phoneNumber || '');
      setValue('address', dataSlack?.data?.address || '');
      clearErrors([
        dataSlack?.data?.fullName && 'fullName',
        dataSlack?.data?.position && 'position',
        dataSlack?.data?.phoneNumber && 'phoneNumber',
        dataSlack?.data?.address && 'address',
      ]);
    }
  }, [dataSlack]);

  const handleErrorAvatar = () => {
    const avatar = uploadAvatar?.urlUpload || '';

    if (avatar) {
      setIsUpload(false);
    } else {
      setIsUpload(true);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div className="new-employee">
      {ROLES.ADMIN === profile?.role || data || checkUrlNew ? (
        <div className="back-new-employee">
          <Link to={ROUTING.EMPLOYEE_LIST} className="back-link">
            <span className="icon-back">{iconBack}</span>
            {intl.formatMessage({ ...messages.backToEmployeeList })}
          </Link>
        </div>
      ) : null}
      <div className="new-employee__form row">
        <div className="col-2">
          <UploadImage
            fetchSlackAvatar={dataSlack?.data?.avatar}
            dataAvatar={profile?.avatar || data?.avatar}
            onUploadAvatarEmployee={onUploadAvatarEmployee}
            uploadAvatar={uploadAvatar}
            slackFetching={dataSlack?.isFetching}
            setIsFile={setIsFile}
            isUpload={isUpload}
            setIsUpload={setIsUpload}
          />
        </div>
        <div className="col-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row row">
              <div
                className={clsx(
                  `${(data || checkUrlNew) && 'col-4 form-item'}`,
                  `${profile && 'col-6'}`,
                )}
              >
                <InputField
                  name="fullName"
                  classLabel="form-label"
                  label={`${intl.formatMessage({ ...messages.fullName })} *`}
                  placeholder={intl.formatMessage({
                    ...messages.placeholderFullName,
                  })}
                  register={register('fullName')}
                  classNameInput={clsx(`${errors.fullName && 'is-invalid'}`)}
                  errors={errors.fullName?.message}
                />
              </div>
              <div
                className={clsx(
                  `${(data || checkUrlNew) && 'col-4 form-item'}`,
                  `${profile && 'col-6'}`,
                )}
              >
                <InputField
                  name="position"
                  placeholder={intl.formatMessage({
                    ...messages.placeholderPosition,
                  })}
                  classLabel="form-label"
                  label={`${intl.formatMessage({ ...messages.position })} *`}
                  register={register('position')}
                  classNameInput={clsx(`${errors.position && 'is-invalid'}`)}
                  errors={errors.position?.message}
                />
              </div>

              <div
                className={clsx(
                  `${(data || checkUrlNew) && 'col-4 fetch-slack'}`,
                  `${profile && 'd-none'}`,
                )}
              >
                <Button
                  onClick={handleFetchDataSlack}
                  isLoading={dataSlack?.isFetching}
                  className="fetch-infor-slack"
                  buttonName={intl.formatMessage({ ...messages.buttonSlack })}
                  iconSlack={<Slack />}
                />
              </div>
            </div>
            <div className="form-row row">
              <div
                className={clsx(
                  `${(data || checkUrlNew) && 'col-4 form-item'}`,
                  `${profile && 'col-6'}`,
                  'phone-field-default',
                )}
              >
                <InputField
                  name="phoneNumber"
                  classLabel="form-label"
                  label={`${intl.formatMessage({ ...messages.phone })} *`}
                  placeholder={intl.formatMessage({
                    ...messages.placeholderPhone,
                  })}
                  register={register('phoneNumber')}
                  classNameInput={clsx(`${errors.phoneNumber && 'is-invalid'}`)}
                  errors={errors.phoneNumber?.message}
                />
              </div>
              <div
                className={clsx(
                  `${(data || checkUrlNew) && 'col-4 form-item'}`,
                  `${profile && 'col-6'}`,
                )}
              >
                <InputField
                  disabled={profile}
                  name="email"
                  classLabel="form-label"
                  label={`${intl.formatMessage({ ...messages.email })} *`}
                  type="text"
                  placeholder={intl.formatMessage({
                    ...messages.placeholderEmail,
                  })}
                  register={register('email')}
                  classNameInput={clsx(`${errors.email && 'is-invalid'}`)}
                  errors={errors.email?.message}
                />
              </div>
            </div>
            <div className="form-row row">
              <div className="col-12">
                <InputField
                  name="address"
                  classLabel="form-label"
                  placeholder={intl.formatMessage({
                    ...messages.placeholderAddress,
                  })}
                  label={`${intl.formatMessage({ ...messages.address })} *`}
                  register={register('address')}
                  classNameInput={clsx(`${errors.address && 'is-invalid'}`)}
                  errors={errors.address?.message}
                />
              </div>
            </div>
            <div className="new-employee__button form-group">
              <Button
                disabled={
                  updateProfile?.isFetching ||
                  updateEmployee?.isFetching ||
                  dataNewEmployee?.isFetching
                }
                isLoading={
                  updateProfile?.isFetching ||
                  updateEmployee?.isFetching ||
                  dataNewEmployee?.isFetching
                }
                type="submit"
                className="button-add button-create"
                onClick={handleErrorAvatar}
                buttonName={
                  (checkUrlEdit &&
                    intl.formatMessage({ ...messages.buttonEdit })) ||
                  (checkUrlNew &&
                    intl.formatMessage({ ...messages.buttonCreate })) ||
                  (checkUrlUpdateProfile &&
                    intl.formatMessage({ ...messages.updateProfile }))
                }
              />

              <Button
                onClick={handleCancel}
                type="button"
                buttonName={intl.formatMessage({ ...messages.buttonCancel })}
                className="button-new-employee-cancel"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  uploadAvatar: makeSelectUploadImage(),
  updateEmployee: makeSelectUpdateEmployee(),
  dataSlack: makeSelectFetchSlack(),
  dataNewEmployee: makeSelectCreateEmployee(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onUploadAvatarEmployee: (formData, callBack) =>
      dispatch(uploadAvatarEmployee(formData, callBack)),

    onUpdateEmployeeDetail: (id, formData, callBack) =>
      dispatch(updateEmployeeDetail(id, formData, callBack)),
    onGetEmployeeDetail: id => dispatch(getEmployeeDetail(id)),

    onFetchDataEmployeeSlack: (email, callBack) =>
      dispatch(fetchDataEmployeeSlack(email, callBack)),
    onCreateEmployee: (data, callBack) =>
      dispatch(createEmployee(data, callBack)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewEmployeePage);

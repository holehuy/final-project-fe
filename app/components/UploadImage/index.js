import clsx from 'clsx';
import { useIntl } from 'react-intl';
import Files from 'react-butterfiles';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { memo, useEffect, useRef, useState } from 'react';
import ImageUploadError from 'assets/images/ImageUploadError.png';
import { iconCamera, iconCancelImage } from 'shared/constants/commonIcon';
import {
  TYPE_MAX_SIZE_IMAGE,
  TYPE_IMAGE_UN_SUPPORTED,
} from 'shared/constants/commonValues';
import {
  deleteAvatar,
  updateUploadAvatar,
} from 'containers/EmployeePage/actions';
import Img from 'components/Img';
import Button from 'components/Button';
import messages from 'components/UploadImage/messages';

function UploadImage({
  fetchSlackAvatar,
  dataAvatar,
  onUploadAvatarEmployee,
  uploadAvatar,
  onDeleteAvatar,
  slackFetching,
  setIsFile,
  onUpdateUploadAvatar,
  isUpload,
  setIsUpload,
}) {
  const intl = useIntl();
  const [files, setFiles] = useState(null);
  const [errors, setErrors] = useState(null);
  const [errorImageUpload, setErrorImageUpload] = useState(false);
  const [conditionFileSize, setConditionFileSize] = useState(false);
  const [conditionFileType, setConditionFileType] = useState(false);

  const handleRemoveImage = () => {
    setFiles(null);
    setErrorImageUpload(false);
    onDeleteAvatar();
    setIsFile(null);
    setIsUpload(false);
  };

  const handleUploadImage = () => {
    if (!files) {
      toast.error(intl.formatMessage({ ...messages.validateEmptyAvatar }));
    } else if (errorImageUpload) {
      toast.error(intl.formatMessage({ ...messages.uploadImageError }));
    } else {
      setIsUpload(false);
      const data = new FormData();
      data.append('image', files.src.file);
      onUploadAvatarEmployee(data, handleCallBackUploadImage);
    }
  };

  const handleCallBackUploadImage = error => {
    if (error) {
      toast.error(
        intl.formatMessage({ ...messages.validateUploadAvatarError }),
      );
    } else {
      toast.success(
        intl.formatMessage({ ...messages.validateUploadAvatarSuccess }),
      );
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
    setErrorImageUpload(false);
    setConditionFileType(false);
    setConditionFileSize(false);
    setErrors(null);
    if (files) {
      setIsUpload(false);
      setIsFile(files);
      if (files.src.base64 === dataAvatar) {
        onUpdateUploadAvatar(dataAvatar);
      } else if (files.src.base64 === fetchSlackAvatar) {
        onUpdateUploadAvatar(fetchSlackAvatar);
      } else {
        onUpdateUploadAvatar('');
      }
    }
  }, [files]);

  useEffect(() => {
    if (dataAvatar) {
      setFiles({
        src: {
          base64: dataAvatar,
        },
      });
      setIsUpload(false);
      onUpdateUploadAvatar(dataAvatar);
    } else {
      onUpdateUploadAvatar('');
    }
  }, []);

  useDidMountEffect(() => {
    if (fetchSlackAvatar) {
      setFiles({
        src: {
          base64: fetchSlackAvatar,
        },
      });
      setIsUpload(false);
      onUpdateUploadAvatar(fetchSlackAvatar);
    } else {
      onUpdateUploadAvatar('');
      setFiles(null);
      setIsFile(null);
    }
  }, [slackFetching]);

  useEffect(() => {
    if (errors?.type === TYPE_IMAGE_UN_SUPPORTED) {
      setConditionFileType(true);
    } else if (errors?.type === TYPE_MAX_SIZE_IMAGE) {
      setConditionFileSize(true);
    }
  }, [errors]);

  return (
    <div className="upload-image">
      <Files
        multiple={false}
        maxSize="2mb"
        multipleMaxSize="10mb"
        accept={['image/jpg', 'image/jpeg', 'image/png']}
        onSuccess={filesUpload => setFiles(...filesUpload)}
        onError={errorsUpload => setErrors(...errorsUpload)}
        convertToBase64
      >
        {({ browseFiles, getDropZoneProps }) => (
          <div
            className={clsx(
              'upload-image__section',
              `${files?.src?.base64 && 'upload-image--show'}`,
              `${(conditionFileSize ||
                conditionFileType ||
                (!files && isUpload)) &&
                'border-error'}`,
            )}
          >
            <div
              className={clsx(
                'upload-image__drag',
                `${files?.src?.base64 && 'upload-image__show'}`,
              )}
              {...getDropZoneProps({})}
            >
              {!files ? (
                <>
                  <span className="icon-camera">{iconCamera}</span>
                  <div className="upload-image__text">
                    <p className="text">
                      {intl.formatMessage({ ...messages.textUpload })}
                    </p>
                    <p className="text">
                      {intl.formatMessage({ ...messages.textOr })}
                      <span
                        onClick={browseFiles}
                        role="button"
                        className="upload-link ml-2"
                      >
                        {intl.formatMessage({ ...messages.textLinkBrowse })}
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span
                    className="icon-cancel"
                    onClick={handleRemoveImage}
                    role="button"
                  >
                    {iconCancelImage}
                  </span>
                  <Img
                    className="upload-avatar"
                    src={files?.src?.base64 || ''}
                    alt="employee avatar"
                    onError={e => {
                      setErrorImageUpload(true);
                      e.target.onerror = null;
                      e.target.src = ImageUploadError;
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </Files>
      {(errorImageUpload && (
        <div className="error-message">
          {intl.formatMessage({ ...messages.uploadImageError })}
        </div>
      )) ||
        (conditionFileType && (
          <div className="error-message">
            {intl.formatMessage({ ...messages.formatAvatar })}
          </div>
        )) ||
        (conditionFileSize && (
          <div className="error-message">
            {intl.formatMessage({ ...messages.validFormatUploadAvatar })}
          </div>
        )) ||
        (isUpload && (
          <div className="error-message">
            {intl.formatMessage({ ...messages.validUpload })}
          </div>
        ))}
      <div className="upload-image__button-upload">
        <Button
          classSpinner="spinner-upload"
          isLoading={uploadAvatar?.isFetching}
          onClick={handleUploadImage}
          className="button-upload"
          buttonName={intl.formatMessage({ ...messages.upload })}
          disabled={
            errorImageUpload ||
            dataAvatar === files?.src?.base64 ||
            uploadAvatar?.isFetching ||
            fetchSlackAvatar === files?.src?.base64 ||
            uploadAvatar?.isFetching
          }
        />
      </div>
    </div>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    onDeleteAvatar: () => dispatch(deleteAvatar()),
    onUpdateUploadAvatar: url => dispatch(updateUploadAvatar(url)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  memo,
)(UploadImage);

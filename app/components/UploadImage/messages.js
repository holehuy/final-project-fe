import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.components.UploadImage';

export default defineMessages({
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Upload',
  },
  textUpload: {
    id: `${scope}.textUpload`,
    defaultMessage: 'Drag Your An Image to Upload',
  },
  textOr: {
    id: `${scope}.textOr`,
    defaultMessage: 'Or ',
  },
  textLinkBrowse: {
    id: `${scope}.textLinkBrowse`,
    defaultMessage: 'Browse',
  },
  formatAvatar: {
    id: `${scope}.formatAvatar`,
    defaultMessage: 'Please upload a file in the correct format.',
  },
  validateUploadAvatarSuccess: {
    id: `${scope}.validateUploadAvatarSuccess`,
    defaultMessage: 'The file has been uploaded.',
  },
  validateUploadAvatarError: {
    id: `${scope}.validateUploadAvatarError`,
    defaultMessage: 'The file uploaded failure.',
  },
  validateEmptyAvatar: {
    id: `${scope}.validateEmptyAvatar`,
    defaultMessage: 'Please select a file.',
  },
  validFormatUploadAvatar: {
    id: `${scope}.validFormatUploadAvatar`,
    defaultMessage: 'Please do not upload files over 2mb.',
  },
  uploadImageError: {
    id: `${scope}.uploadImageError`,
    defaultMessage: 'Unable to upload due to corrupted image file.',
  },
  validUpload: {
    id: `${scope}.validUpload`,
    defaultMessage: 'Please upload the file.',
  },
});

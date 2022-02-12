import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.containers.EmployeePage.NewEmployee';

export default defineMessages({
  backToEmployeeList: {
    id: `${scope}.backToEmployeeList`,
    defaultMessage: 'Back to Employee List',
  },
  upload: {
    id: `${scope}.upload`,
    defaultMessage: 'Upload',
  },
  fullName: {
    id: `${scope}.fullName`,
    defaultMessage: 'Full Name',
  },
  placeholderFullName: {
    id: `${scope}.placeholderFullName`,
    defaultMessage: 'Ex: Le Nguyen Minh Tien',
  },
  phone: {
    id: `${scope}.phone`,
    defaultMessage: 'Phone',
  },
  placeholderPhone: {
    id: `${scope}.placeholderPhone`,
    defaultMessage: 'Ex: 0935353535',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'Address',
  },
  placeholderAddress: {
    id: `${scope}.placeholderAddress`,
    defaultMessage: 'Ex: 16 Ly Thuong Kiet, Hai Chau, Da Nang, Viet Nam',
  },
  position: {
    id: `${scope}.position`,
    defaultMessage: 'Position',
  },
  placeholderPosition: {
    id: `${scope}.placeholderPosition`,
    defaultMessage: 'Ex: Product Owner',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  placeholderEmail: {
    id: `${scope}.placeholderEmail`,
    defaultMessage: 'Ex: tienlnm@rising-stars.vn',
  },
  buttonSlack: {
    id: `${scope}.buttonSlack`,
    defaultMessage: 'Fetch Info from Slack',
  },
  buttonCreate: {
    id: `${scope}.buttonCreate`,
    defaultMessage: 'Create Employee',
  },
  buttonEdit: {
    id: `${scope}.buttonEdit`,
    defaultMessage: 'Edit Employee',
  },
  buttonCancel: {
    id: `${scope}.buttonCancel`,
    defaultMessage: 'Cancel',
  },
  validateName: {
    id: `${scope}.validateName`,
    defaultMessage: 'Full name is required.',
  },
  myProfile: {
    id: `${scope}.myProfile`,
    defaultMessage: '',
  },
  validatePosition: {
    id: `${scope}.validatePosition`,
    defaultMessage: 'Position is required.',
  },
  validatePhone: {
    id: `${scope}.validatePhone`,
    defaultMessage: 'Phone number is required.',
  },
  validFormatPhone: {
    id: `${scope}.validFormatPhone`,
    defaultMessage: 'Please enter a valid phone number.',
  },
  validateEmail: {
    id: `${scope}.validateEmail`,
    defaultMessage: 'Email is required.',
  },
  validFormatEmail: {
    id: `${scope}.validFormatEmail`,
    defaultMessage: 'Please enter a valid email.',
  },
  validateAddress: {
    id: `${scope}.validateAddress`,
    defaultMessage: 'Address is required.',
  },
  validateAvatar: {
    id: `${scope}.validateAvatar`,
    defaultMessage: 'Avatar is required.',
  },
  validateLength: {
    id: `${scope}.validateLength`,
    defaultMessage: 'Please enter within 255 characters.',
  },
  fetchSlackSuccess: {
    id: `${scope}.fetchSlackSuccess`,
    defaultMessage: 'Fetch info from Slack successfully.',
  },
  fetchSlackError: {
    id: `${scope}.fetchSlackError`,
    defaultMessage:
      'Email is not available in Rising Stars or Est Rouge workspaces.',
  },
  updateSuccess: {
    id: `${scope}.updateSuccess`,
    defaultMessage: 'Update Employee Detail Successfully.',
  },
  updateError: {
    id: `${scope}.updateError`,
    defaultMessage: 'Update Employee Detail failure.',
  },
  createSuccess: {
    id: `${scope}.createSuccess`,
    defaultMessage: 'Create Employee successfully.',
  },
  createError: {
    id: `${scope}.createError`,
    defaultMessage: 'Create Employee failure.',
  },
  updateProfile: {
    id: `${scope}.updateProfile`,
    defaultMessage: 'Update Profile',
  },
  updateProfileSuccess: {
    id: `${scope}.updateProfileSuccess`,
    defaultMessage: 'Your Profile has been updated successfully.',
  },
  updateProfileError: {
    id: `${scope}.updateProfileError`,
    defaultMessage: 'Your Profile has been updated failure.',
  },
  emailUsed: {
    id: `${scope}.emailUsed`,
    defaultMessage: 'This email is already in use.',
  },
  phoneUsed: {
    id: `${scope}.phoneUsed`,
    defaultMessage: 'This phone number is already in use.',
  },
  validOrgEmail: {
    id: `${scope}.validOrgEmail`,
    defaultMessage: 'Email does not belong to your organization.',
  },
  createNoInternet: {
    id: `${scope}.createNoInternet`,
    defaultMessage: 'Failed to get information from Slack.',
  },
});

import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.components.HeaderUserMenu';

export default defineMessages({
  myProfile: {
    id: `${scope}.myProfile`,
    defaultMessage: 'My Profile',
  },
  signOut: {
    id: `${scope}.signOut`,
    defaultMessage: 'Sign Out',
  },
});

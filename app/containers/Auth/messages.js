import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.containers.Auth';

export default defineMessages({
  loginFailure: {
    id: `${scope}.loginFailure`,
    defaultMessage: 'This user is not part of our organization!',
  },
});

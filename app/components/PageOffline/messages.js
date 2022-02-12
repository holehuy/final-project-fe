import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.containers.PageOffline';

export default defineMessages({
  disconnected: {
    id: `${scope}.disconnected`,
    defaultMessage: 'The network connection was lost. Please try again.',
  },
});

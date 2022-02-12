import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.components.Pagination';

export default defineMessages({
  showDataText: {
    id: `${scope}.showDataText`,
    defaultMessage: 'Showing {limitPage} of {totalPage} employees',
  },
  showCross: {
    id: `${scope}.showCross`,
    defaultMessage: '-',
  },
});

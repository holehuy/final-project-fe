import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.containers.EmployeePage';

export default defineMessages({
  buttonNewEmployee: {
    id: `${scope}.buttonNewEmployee`,
    defaultMessage: 'New Employee',
  },
  deleteSuccess: {
    id: `${scope}.deleteSuccess`,
    defaultMessage: 'Delete Employee successfully!',
  },
  deleteFailure: {
    id: `${scope}.deleteFailure`,
    defaultMessage: 'Delete Employee failure!',
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: 'No relevant items found',
  },
});

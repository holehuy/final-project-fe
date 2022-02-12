import { defineMessages } from 'react-intl';

export const scope = 'evaluationSystem.containers.EmployeePage.EmployeeItem';

export default defineMessages({
  editEmployee: {
    id: `${scope}.editEmployee`,
    defaultMessage: 'Edit Employee',
  },
  deleteEmployee: {
    id: `${scope}.deleteEmployee`,
    defaultMessage: 'Delete Employee',
  },
  deleteEmployeeModal: {
    id: `${scope}.deleteEmployeeModal`,
    defaultMessage: `Delete Employee ?`,
  },
  ModalTitle: {
    id: `${scope}.ModalTitle`,
    defaultMessage: `Are you sure to delete user employee {fullName}?`,
  },
  ModelCancel: {
    id: `${scope}.ModelCancel`,
    defaultMessage: `You can't undo this action.`,
  },
  buttonCancel: {
    id: `${scope}.buttonCancel`,
    defaultMessage: `Cancel`,
  },
  buttonDelete: {
    id: `${scope}.buttonDelete`,
    defaultMessage: `Delete`,
  },
  deleteFailure: {
    id: `${scope}.deleteFailure`,
    defaultMessage: `Delete Employee failure!`,
  },
});

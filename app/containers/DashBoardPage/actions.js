import { REQUEST } from 'utils/actionType';
import { CHANGE_USERNAME } from 'containers/DashBoardPage/constants';

export function changeUsername(username) {
  return {
    type: REQUEST(CHANGE_USERNAME),
    username,
  };
}

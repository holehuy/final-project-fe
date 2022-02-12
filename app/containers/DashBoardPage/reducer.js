import produce from 'immer';
import { CHANGE_USERNAME } from 'containers/DashBoardPage/constants';

export const initialState = {
  username: '',
};

const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        draft.username = action.username.replace(/@/gi, '');
        break;
      default:
        break;
    }
  });

export default homeReducer;

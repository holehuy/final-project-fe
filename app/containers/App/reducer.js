import produce from 'immer';
import { SAVE_TEXT_SEARCH } from 'containers/App/constants';

export const initialState = {
  textSearch: '',
};

const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_TEXT_SEARCH:
        draft.textSearch = action.textSearch;
        break;
      default:
        break;
    }
  });

export default appReducer;

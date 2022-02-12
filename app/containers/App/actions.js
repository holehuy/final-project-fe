import { SAVE_TEXT_SEARCH } from 'containers/App/constants';

export function saveTextSearch(textSearch) {
  return {
    type: SAVE_TEXT_SEARCH,
    textSearch,
  };
}

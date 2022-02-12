import produce from 'immer';
import { DEFAULT_LOCALE } from 'i18n';
import { CookiesStorage } from 'shared/configs/cookie';
import { CHANGE_LOCALE } from 'containers/LanguageProvider/constants';

export const initialState = {
  locale: CookiesStorage.getCookieData('language') || DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;

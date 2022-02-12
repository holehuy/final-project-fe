import { CHANGE_LOCALE } from 'containers/LanguageProvider/constants';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}

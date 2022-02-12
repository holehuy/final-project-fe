import { addMonths } from 'date-fns';
import Cookies from 'universal-cookie';
import { CookieKey } from 'shared/constants/common';

const cookies = new Cookies();
export const CookiesStorage = {
  getCookieData(key) {
    return cookies.get(key);
  },
  setCookieData(key, data) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(key, data, { expires, path: '/' });
  },
  clearCookieData(key) {
    cookies.remove(key, { path: '/' });
  },
  getAccessToken() {
    return cookies.get(CookieKey.accessToken);
  },

  setAccessToken(accessToken) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(CookieKey.accessToken, accessToken, {
      expires,
      path: '/',
    });
  },
  clearData() {
    cookies.remove(CookieKey.accessToken, { path: '/' });
  },

  authenticated() {
    const accessToken = cookies.get(CookieKey.accessToken);
    // todo more case - ext: check expired time
    return accessToken !== undefined;
  },
};

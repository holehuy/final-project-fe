import { CookiesStorage } from 'shared/configs/cookie';

const LIMIT_PAGE_VERTICAL = 12;
const TYPE_NEWEST_EMPLOYEES = 1;
const LIMIT_PAGE_HORIZONTAL = 4;

const LAYOUT_HORIZONTAL = 'horizontal';
const LAYOUT_VERTICAL = 'vertical';
const LANGUAGE_DEFAULT = 'en';

const LAYOUT_EMPLOYEE =
  CookiesStorage.getCookieData('layoutEmployee') || LAYOUT_VERTICAL;

const TYPE_MAX_SIZE_IMAGE = 'maxSizeExceeded';
const TYPE_IMAGE_UN_SUPPORTED = 'unsupportedFileType';

const REGEX_PHONE = /^(0[1-9])+([0-9]{8,9})\s*$/;
const REGEX_MAIL_DOMAIN = /@rising-stars.vn|@tech.est-rouge.com\s*$/;

export {
  TYPE_NEWEST_EMPLOYEES,
  LAYOUT_HORIZONTAL,
  LAYOUT_VERTICAL,
  LIMIT_PAGE_HORIZONTAL,
  LIMIT_PAGE_VERTICAL,
  LAYOUT_EMPLOYEE,
  LANGUAGE_DEFAULT,
  TYPE_MAX_SIZE_IMAGE,
  TYPE_IMAGE_UN_SUPPORTED,
  REGEX_PHONE,
  REGEX_MAIL_DOMAIN,
};

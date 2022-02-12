import { isNil, omitBy } from 'lodash';
import queryString from 'query-string';

function handlePayload(payload) {
  const newPayload = {};
  payload &&
    Object.keys(payload).forEach(key => {
      newPayload[key] = payload[key] === '' ? null : payload[key];
    });
  return omitBy(newPayload, isNil);
}

const stringifyParams = ({ params, option = {} }) =>
  queryString.stringify(handlePayload({ ...params }), {
    arrayFormat: 'comma',
    encode: false,
    skipNull: true,
    skipEmptyString: true,
    ...option,
  });

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const removeEmpty = obj => {
  if (!obj) return obj;
  const notNullOrUndefinedProp = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] != null && obj[key] !== '') {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (Array.isArray(obj[key])) {
        // eslint-disable-next-line array-callback-return
        obj[key].map((el, i) => {
          obj[key][i] = typeof el === 'string' ? el.trim() : el;
        });
      } else if (obj[key] instanceof Object) {
        Object.keys(obj[key]).map(
          // eslint-disable-next-line no-return-assign
          k =>
            (obj[key][k] =
              typeof obj[key][k] === 'string'
                ? obj[key][k].trim()
                : obj[key][k]),
        );
      }
      acc = { ...acc, [key]: obj[key] };
    }
    return acc;
  }, {});
  return notNullOrUndefinedProp;
};

export { handlePayload, stringifyParams, scrollToTop, removeEmpty };

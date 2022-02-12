/* eslint-disable func-names */
import axios from 'axios';
import { isNil } from 'lodash-es';
import { mergeWith } from 'lodash';
import { camelizeKeys } from 'humps';
import { stringifyParams } from 'utils/common';
import { API_BASE_URL } from 'shared/configs/setting';
import { CookiesStorage } from 'shared/configs/cookie';

const customizer = (objValue, srcValue, key) => {
  if (key === 'Accept-Language') {
    return objValue;
  }
};

export const generateToken = () => ({
  Authorization: `Bearer ${CookiesStorage.getAccessToken()}`,
});

const defaultOptions = {};

function getNotAuthApi(path, options = {}, apiURL) {
  const online = navigator.onLine;
  if (!online) return;
  return axios.get(`${apiURL || API_BASE_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
    },
  });
}

function getApi(path, options = {}, apiURL) {
  // const { params } = options;
  return axios.get(`${apiURL || API_BASE_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function postApi(path, data, options = {}, isAuth = true) {
  const headerParams = mergeWith(
    options.headers,
    isAuth ? generateToken() : {},
    customizer,
  );

  return axios.post(`${API_BASE_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: headerParams,
  });
}

function putApi(path, data, options = {}) {
  return axios.put(`${API_BASE_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function patchApi(path, data, options = {}) {
  return axios.patch(`${API_BASE_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function deleteApi(path, options = {}) {
  return axios.delete(`${API_BASE_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
    },
  });
}

function uploadApi(path, files, options = {}, uploadSingle = false) {
  const formData = new FormData();
  uploadSingle
    ? files.forEach(file => {
        formData.append(`file`, file);
      })
    : files.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });

  return axios.post(`${API_BASE_URL}/${path.replace(/^\//, '')}`, formData, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers,
      ...generateToken(),
      'Content-Type': 'multipart/form-data',
    },
  });
}

function redirectTo() {
  window.location.href = 'auth/login';
}

function redirectToNotFoundPage() {
  window.location.href = '/pageNotFound';
}

function handleErrorStatus(error) {
  const status = error?.status || error?.response?.status || null;
  switch (status) {
    case 500:
      return error?.response;
    case 400:
      return error?.response;
    case 401:
      CookiesStorage.clearData();
      redirectTo();
      return error.response;
    case 403:
      window.location.reload();
      return error.response;
    case 404:
      redirectToNotFoundPage();
      return error;
    case 409:
      return error?.response;
    case 200:
    case 201:
    case 204:
    case 422:
      return error;
    default:
      return error;
  }
}

axios.interceptors.response.use(
  response => {
    if (response && response.data) {
      response.data = camelizeKeys(response.data);
    }
    return handleErrorStatus(response);
  },
  error => {
    if (error?.response?.statusCode === 401) {
      CookiesStorage.clearData();
      redirectTo();
    }
    return Promise.reject(handleErrorStatus(error));
  },
);

axios.interceptors.request.use(config => {
  const newConfig = { ...config };
  if (newConfig.headers['Content-Type'] === 'multipart/form-data')
    return newConfig;
  // if (config.params) {
  //   newConfig.params = decamelizeKeys(config.params);
  // }
  // if (config.data) {
  //   newConfig.data = decamelizeKeys(config.data);
  // }
  return newConfig;
});

axios.defaults.paramsSerializer = params =>
  stringifyParams({
    params: { ...params },
    option: {
      encode: !isNil(params?.tags) || false,
    },
  });

const Api = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
  upload: uploadApi,
  patch: patchApi,
  getNotAuth: getNotAuthApi,
};

export default Api;

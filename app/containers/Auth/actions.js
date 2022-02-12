import { REQUEST } from 'utils/actionType';
import {
  GET_TOKEN,
  REMOVE_TOKEN,
  GET_PROFILE,
  UPDATE_PROFILE,
} from 'containers/Auth/constants';

export function saveToken(dataToken) {
  return {
    type: REQUEST(GET_TOKEN),
    dataToken,
  };
}

export function removeToken(dataToken) {
  return {
    type: REQUEST(REMOVE_TOKEN),
    dataToken,
  };
}

export function getProfile(dataProfile) {
  return {
    type: REQUEST(GET_PROFILE),
    dataProfile,
  };
}

export function updateProfile(dataProfile, callBack) {
  return {
    type: REQUEST(UPDATE_PROFILE),
    dataProfile,
    callBack,
  };
}

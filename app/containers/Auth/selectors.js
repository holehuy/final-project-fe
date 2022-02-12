import { createSelector } from 'reselect';
import { initialState } from 'containers/Auth/reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectAccessToken = () =>
  createSelector(
    selectAuth,
    authState => authState.accessToken,
  );

const makeSelectMyProfile = () =>
  createSelector(
    selectAuth,
    authState => authState.dataProfile,
  );

const makeSelectUpdateMyProfile = () =>
  createSelector(
    selectAuth,
    authState => authState.updateProfile,
  );

export {
  selectAuth,
  makeSelectAccessToken,
  makeSelectMyProfile,
  makeSelectUpdateMyProfile,
};

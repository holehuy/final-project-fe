import { createSelector } from 'reselect';
import { initialState } from 'containers/DashBoardPage/reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

export { selectHome, makeSelectUsername };

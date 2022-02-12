import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectTextSearch = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.textSearch || '',
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { selectGlobal, makeSelectTextSearch, makeSelectLocation };

import { combineReducers } from 'redux';
import auth, { initialState as authInitialState } from './auth/reducer';
import nlu, { initialState as nluInitialState } from './nlu/reducer';

export const initialState = {
  auth: authInitialState,
  nlu: nluInitialState,
};

export default combineReducers({
  auth,
  nlu,
});

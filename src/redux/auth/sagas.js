import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import apiConfig from '../../apis/api';
import { setCookie } from '../../utils/cookie';

import api from '../../apis';
import actions from '../actions';

function* verifyTokenSaga({ accessToken }) {
  try {
    const { data } = yield api.auth.verify(accessToken);
    if (!data.status) throw new Error();
    apiConfig.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    yield put(
      actions.auth.verifyTokenSuccess({
        accessToken,
        user: data.result,
      }),
    );
  } catch (error) {
    yield put(actions.auth.verifyTokenFailure());
  }
}

function* logoutSaga() {
  try {
    const { status } = yield api.auth.logout();
    if (!status) throw new Error();
    yield put(actions.auth.logoutSuccess());
    setCookie('accessToken', null, 1);
  } catch (error) {
    throw new Error();
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
    takeLatest(actions.auth.actionTypes.LOGOUT, logoutSaga),
  ]);
}

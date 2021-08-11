export const actionTypes = {
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
  VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',
};

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

export function logoutSuccess() {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
}

export function verifyToken(accessToken) {
  return {
    type: actionTypes.VERIFY_TOKEN,
    accessToken,
  };
}

export function verifyTokenSuccess({ accessToken, user }) {
  return {
    type: actionTypes.VERIFY_TOKEN_SUCCESS,
    accessToken,
    user,
  };
}

export function verifyTokenFailure() {
  return {
    type: actionTypes.VERIFY_TOKEN_FAILURE,
  };
}

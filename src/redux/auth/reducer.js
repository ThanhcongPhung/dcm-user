import { actionTypes } from './actions';

export const initialState = {
  accessToken: null,
  verifying: false,
  user: {
    userId: null,
    ssoUserId: null,
    email: null,
    name: null,
    avatar: null,
    createdAt: null,
  },
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        accessToken: null,
      };
    case actionTypes.VERIFY_TOKEN:
      return { ...state, verifying: true };
    case actionTypes.VERIFY_TOKEN_SUCCESS: {
      const {
        accessToken,
        user: { ssoUserId, id, email, name, avatar, createdAt },
      } = action;
      return {
        ...state,
        verifying: false,
        accessToken,
        user: {
          ssoUserId,
          userId: id,
          email,
          name,
          avatar,
          createdAt,
        },
      };
    }
    case actionTypes.VERIFY_TOKEN_FAILURE:
      return { ...state, verifying: false };
    default:
      return state;
  }
}

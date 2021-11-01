import { USER_STATUS } from '../../constants/nlu';
import { actionTypes } from './actions';

export const initialState = {
  socket: null,
  status: null,
  promptId: null,
  room: null,
  intents: [],
  role: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SOCKET: {
      const { socket } = action;
      return {
        ...state,
        socket,
      };
    }
    case actionTypes.UPDATE_USER_STATUS: {
      const { status, data } = action;
      return {
        ...state,
        status,
        promptId:
          status === USER_STATUS.CONFIRM_JOIN_ROOM
            ? data.promptId
            : state.promptId,
      };
    }
    case actionTypes.UPDATE_ROOM: {
      const { room, role } = action;
      return {
        ...state,
        status: USER_STATUS.IN_ROOM,
        promptId: null,
        room,
        role,
      };
    }
    case actionTypes.UPDATE_INTENTS: {
      const { intents } = action;
      return {
        ...state,
        intents,
      };
    }
    case actionTypes.ADD_NEW_MESSAGE: {
      const { message } = action;
      const { room } = state;
      return {
        ...state,
        status: USER_STATUS.IN_ROOM,
        room: { ...room, messages: [...room.messages, message] },
      };
    }
    case actionTypes.REMOVE_ALL: {
      return {
        socket: null,
        status: null,
        promptId: null,
        room: null,
        intents: [],
        role: null,
        error: null,
      };
    }
    default:
      return state;
  }
}

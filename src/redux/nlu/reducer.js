import { USER_STATUS, USER_ROLE } from '../../constants/nlu';
import { actionTypes } from './actions';

export const initialState = {
  socket: null,
  status: null,
  promptId: null,
  room: null,
  intents: [],
  role: null,
  error: null,
  currentMessage: null,
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

    case actionTypes.CONFIRM_INTENT_NEW_MESSAGE: {
      const { message, error, countError } = action;
      const { currentMessage } = state;
      return {
        ...state,
        status: USER_STATUS.CONFIRM_INTENT_NEW_MESSAGE,
        currentMessage:
          !countError || (countError <= 0 && message)
            ? { ...message }
            : currentMessage,
        error,
      };
    }
    case actionTypes.CONFIRM_SLOT_NEW_MESSAGE: {
      const { error } = action;
      return {
        ...state,
        status: USER_STATUS.CONFIRM_SLOT_NEW_MESSAGE,
        error,
      };
    }
    case actionTypes.REMOVE_CURRENT_MESSAGE: {
      const { error } = action;
      const { room, role } = state;
      const newMessages = [...room.messages];
      if (role === USER_ROLE.CLIENT) {
        newMessages.pop();
      }
      return {
        ...state,
        status: USER_STATUS.IN_ROOM,
        error,
        currentMessage: null,
        room: { ...room, messages: [...newMessages] },
      };
    }
    case actionTypes.UPDATE_SLOTS_MAIN_INTENT: {
      const { slots } = action;
      const { room } = state;
      return {
        ...state,
        room: { ...room, mainIntent: { ...room.mainIntent, slots } },
      };
    }
    case actionTypes.UPDATE_SLOTS_OTHER_INTENT: {
      const { slots } = action;
      const { room } = state;
      const newOtherIntents = [...room.otherIntents];
      const intentFindIndex = 0;
      if (intentFindIndex >= 0) {
        newOtherIntents[intentFindIndex] = {
          ...newOtherIntents[intentFindIndex],
          slots,
        };
      }
      return {
        ...state,
        room: { ...room, otherIntents: [...newOtherIntents] },
      };
    }
    case actionTypes.ADD_OTHER_INTENT: {
      const { intent } = action;
      const { room } = state;
      return {
        ...state,
        room: { ...room, otherIntents: [{ ...intent }, ...room.otherIntents] },
      };
    }
    case actionTypes.USER_LEAVE_ROOM: {
      return {
        ...state,
        status: null,
        promptId: null,
        room: null,
        intents: [],
        role: null,
        error: null,
        currentMessage: null,
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
        currentMessage: null,
      };
    }
    case actionTypes.MISSION_COMPLETE: {
      return {
        ...state,
        status: USER_STATUS.MISSION_COMPLETE,
      };
    }
    default:
      return state;
  }
}

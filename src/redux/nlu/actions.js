export const actionTypes = {
  UPDATE_SOCKET: 'UPDATE_SOCKET',
  UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
  UPDATE_ROOM: 'UPDATE_ROOM',
  UPDATE_INTENTS: 'UPDATE_INTENTS',
  REMOVE_ALL: 'REMOVE_ALL',
  ADD_NEW_MESSAGE: 'ADD_NEW_MESSAGE',
  REMOVE_CURRENT_MESSAGE: 'REMOVE_CURRENT_MESSAGE',
  CONFIRM_INTENT_NEW_MESSAGE: 'CONFIRM_INTENT_NEW_MESSAGE',
  CONFIRM_SLOT_NEW_MESSAGE: 'CONFIRM_SLOT_NEW_MESSAGE',
  UPDATE_SLOTS_MAIN_INTENT: 'UPDATE_SLOTS_MAIN_INTENT',
  UPDATE_SLOTS_OTHER_INTENT: 'UPDATE_SLOTS_OTHER_INTENT',
  ADD_OTHER_INTENT: 'ADD_OTHER_INTENT',
  MISSION_COMPLETE: 'MISSION_COMPLETE',
  USER_LEAVE_ROOM: 'USER_LEAVE_ROOM',
};

export function updateSocket(socket) {
  return {
    type: actionTypes.UPDATE_SOCKET,
    socket,
  };
}

export function updateUserStatus(status, data) {
  return {
    type: actionTypes.UPDATE_USER_STATUS,
    status,
    data,
  };
}

export function updateRoom(room, role) {
  return {
    type: actionTypes.UPDATE_ROOM,
    room,
    role,
  };
}

export function updateIntents(intents) {
  return {
    type: actionTypes.UPDATE_INTENTS,
    intents,
  };
}

export function removeAll() {
  return {
    type: actionTypes.REMOVE_ALL,
  };
}

export function addNewMessage(message) {
  return {
    type: actionTypes.ADD_NEW_MESSAGE,
    message,
  };
}

export function removeCurrentMessage({ error }) {
  return {
    type: actionTypes.REMOVE_CURRENT_MESSAGE,
    error,
  };
}

export function confirmIntentNewMessage({ message, error, countError }) {
  return {
    type: actionTypes.CONFIRM_INTENT_NEW_MESSAGE,
    message,
    error,
    countError,
  };
}

export function confirmSlotNewMessage({ error, countError }) {
  return {
    type: actionTypes.CONFIRM_SLOT_NEW_MESSAGE,
    error,
    countError,
  };
}

export function updateSlotsMainIntent(slots, intentId) {
  return {
    type: actionTypes.UPDATE_SLOTS_MAIN_INTENT,
    slots,
    intentId,
  };
}

export function updateSlotsOtherIntent(slots, intentId) {
  return {
    type: actionTypes.UPDATE_SLOTS_OTHER_INTENT,
    slots,
    intentId,
  };
}

export function addOtherIntent(intent) {
  return {
    type: actionTypes.ADD_OTHER_INTENT,
    intent,
  };
}

export function missionComplete() {
  return {
    type: actionTypes.MISSION_COMPLETE,
  };
}

export function userLeaveRoom() {
  return {
    type: actionTypes.USER_LEAVE_ROOM,
  };
}

export function userDisconnect() {
  return {
    type: actionTypes.USER_LEAVE_ROOM,
  };
}

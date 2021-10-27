export const actionTypes = {
  UPDATE_SOCKET: 'UPDATE_SOCKET',
  UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
  UPDATE_ROOM: 'UPDATE_ROOM',
  UPDATE_INTENTS: 'UPDATE_INTENTS',
  REMOVE_ALL: 'REMOVE_ALL',
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

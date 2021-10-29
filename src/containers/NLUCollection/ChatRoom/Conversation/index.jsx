import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';
import MessageContent from './MessageContent';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';
import SelectIntentDialog from './SelectIntentDialog';
import {
  SOCKET_EVENT,
  USER_ROLE,
  USER_STATUS,
} from '../../../../constants/nlu';
import actions from '../../../../redux/actions';
import { ContainerStyled } from './index.style';

const ChatRoom = ({ campaign }) => {
  const dispatch = useDispatch();
  const [currentMsg, setCurrentMsg] = useState('');
  const [openConfirmIntent, setOpenConfirmIntent] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { intents, room, socket, role } = useSelector((state) => state.nlu);

  const handleCloseConfirmIntent = () => {
    setOpenConfirmIntent(false);
  };

  const handleCancelSend = () => {
    handleCloseConfirmIntent();
  };

  const sendMessage = (message) => {
    const msg = {
      ...message,
      id: uuidV4(),
      sender: { user: user.email, role },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch(actions.nlu.addNewMessage(msg));
    if (role === USER_ROLE.CLIENT) {
      dispatch(
        actions.nlu.updateUserStatus(USER_STATUS.WAITING_CONFIRM_MESSAGE),
      );
    }
    const data = JSON.stringify({
      type: SOCKET_EVENT.USER_SEND_MESSAGE,
      data: { roomId: room.id, message: { ...msg } },
    });
    socket.send(data);
  };

  const handleClickSendIcon = (message) => {
    if (role === USER_ROLE.AGENT) {
      sendMessage({ content: { ...message } });
      return;
    }
    setCurrentMsg(message);
    setOpenConfirmIntent(true);
  };

  const handleSendAfterConfirm = (message) => {
    handleCloseConfirmIntent();
    const { slots, ...msg } = message;
    const newSlots = slots ? [...slots] : [];
    sendMessage({ ...msg, intent: { ...msg.intent, slots: [...newSlots] } });
  };

  return (
    <ContainerStyled>
      <MessageHeader campaign={campaign} />
      <Divider />
      <MessageContent messages={room && room.messages} role={role} />
      <MessageInput sendMessage={handleClickSendIcon} />
      {openConfirmIntent && (
        <SelectIntentDialog
          open={openConfirmIntent}
          message={currentMsg}
          intents={intents}
          onCancel={handleCancelSend}
          onSend={handleSendAfterConfirm}
          campaign={campaign}
        />
      )}
    </ContainerStyled>
  );
};

export default ChatRoom;

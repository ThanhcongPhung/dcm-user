import React, { useEffect, useState } from 'react';

import { Button, Divider, Modal, Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CountdownTimer from './CountdownTimer';
import { ConfirmModalStyled } from './index.style';

export default function ConfirmModal(props) {
  const {
    socket,
    promptStatus,
    visible,
    handleCancel,
    roomType,
    handleOk,
    promptDuration,
    setPromptStatus,
  } = props;
  const [buttonState, setButtonState] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (socket) socket.on('wait for other prompt', () => setPromptStatus(1));
  });
  const handleSubmit = () => {
    if (!buttonState) {
      setButtonState(true);
      handleOk();
      setButtonState(false);
    }
  };
  return (
    <ConfirmModalStyled>
      {promptStatus === 0 ? (
        <Modal disableBackdropClick open={props ? visible : false}>
          <Paper className="modalPaper">
            <p className="textP">{t('userFounded')}</p>
            <CountdownTimer
              handleTimeout={handleCancel}
              key={visible}
              isPlaying={visible}
              duration={promptDuration}
            />
            <Divider classes="dividerComponent" />
            <div className="groupButton">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                {t('ignore')}
              </Button>
              {buttonState ? (
                <Button variant="contained" className="buttonStart" disabled>
                  {t('start')}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  className="buttonStart"
                  onClick={handleSubmit}
                >
                  {t('start')}
                </Button>
              )}
            </div>
          </Paper>
        </Modal>
      ) : (
        <Modal open={visible} disableBackdropClick>
          <Paper className="modalPaper">
            <h2>{`${t('room')} ${roomType}`}</h2>
            <p>{t('waitingConfirm')}</p>
          </Paper>
        </Modal>
      )}
    </ConfirmModalStyled>
  );
}

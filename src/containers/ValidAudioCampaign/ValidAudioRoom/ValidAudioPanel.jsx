import React, { useRef, useState } from 'react';
import {
  Button,
  Card,
  IconButton,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';
import { ExitToApp, MoreVert, ThumbUp } from '@material-ui/icons';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSave } from 'react-icons/all';
import { useTranslation } from 'react-i18next';
import AudioPlayer from './AudioPlayer';
import { ValidAudioPanelStyled } from './index.style';

function createData(id, script, user, describe) {
  return {
    id,
    script,
    user,
    describe,
  };
}
export default function ValidAudioPanel({
  history,
  campaignId,
  audioLink,
  audioRef,
  radioValue,
  currentChat,
  setRadioValue,
  setSelectedIndex,
  setCurrentChat,
  selectedIndex,
  audioList,
  roomName,
}) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const textInput = useRef();

  const { t } = useTranslation();

  const handleChange = (event) => {
    setRadioValue(event.target.value);
  };

  const toggleBack = () => {
    setHasPlayed(false);
    setSelectedIndex(selectedIndex - 1);
    setCurrentChat(audioList[selectedIndex - 1]);
  };

  const toggleNext = () => {
    setHasPlayed(false);
    setPlaying(false);
    setSelectedIndex(selectedIndex + 1);
    setCurrentChat(audioList[selectedIndex + 1]);
    setRadioValue('');
  };
  const handleVoteLike = (audio) => {
    console.log(audio);
  };

  // eslint-disable-next-line consistent-return
  const renderRow = (audio) => {
    if (audio.script) {
      return (
        <TableRow key={uuidV4()}>
          <TableCell component="th" scope="row">
            <Radio
              checked={radioValue === audio.script}
              onChange={handleChange}
              value={audio.script}
              name="radio-buttons"
              inputProps={{ 'aria-label': audio.script }}
            />
          </TableCell>
          <TableCell>{audio.script}</TableCell>
          <TableCell align="center">
            <Button
              className={`vote-button ${hasPlayed ? 'yes' : ''}`}
              onClick={() => handleVoteLike(audio)}
              disabled={!hasPlayed}
            >
              <ThumbUp />
            </Button>
          </TableCell>
        </TableRow>
      );
    }
  };

  // eslint-disable-next-line consistent-return
  const renderScriptList = () => {
    if (currentChat) {
      const scriptLists = [
        createData(
          'Origin Transcript',
          currentChat.originTranscript,
          null,
          'Origin Transcript',
        ),
        createData(
          'Bot Transcript',
          currentChat.botTranscript,
          null,
          'Bot Transcript',
        ),
        createData(
          'Edited Transcript',
          currentChat.finalTranscript,
          null,
          'Edited Transcript',
        ),
      ];
      if (currentChat.downVote.length > 0) {
        // eslint-disable-next-line array-callback-return
        currentChat.downVote.map((value, index) => {
          const idKey = `script ${index}`;
          const data = createData(
            idKey,
            value.newTranscript,
            value.user,
            value.downVoteTime,
          );
          scriptLists.push(data);
        });
      }
      return (
        <TableBody>{scriptLists.map((audio) => renderRow(audio))}</TableBody>
      );
    }
  };
  const updateValue = () => {
    const valueType = textInput.current.value;
    setRadioValue(valueType);
  };

  return (
    <ValidAudioPanelStyled>
      <div className="controlPanel">
        <div className="validAudioWrapper">
          <Card className="headerChatAudio">
            <Button
              onClick={() =>
                history.push(`/campaigns/${campaignId}/valid-audio`)
              }
            >
              <ExitToApp className="buttonFill" />
            </Button>
            <div className="buttonFill">{roomName}</div>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
            >
              <MoreVert className="buttonFill" />
            </IconButton>
          </Card>
          <AudioPlayer
            hasPlayed={hasPlayed}
            setHasPlayed={setHasPlayed}
            audioLink={audioLink}
            playing={playing}
            setPlaying={setPlaying}
            audioRef={audioRef}
          />
          <div className="form-radio">
            <div className="tableFormat">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" className="headerTable1">
                        {t('selection')}
                      </TableCell>
                      <TableCell align="center" className="headerTable2">
                        {t('audioScript')}
                      </TableCell>
                      <TableCell align="center" className="headerTable3">
                        {t('action')}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {renderScriptList()}
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="showText">
            <div className="textWrapper">
              <TextField
                id="full-width-text-field"
                type="text"
                inputRef={textInput}
                variant="outlined"
                multiline
                rows={4}
                className="textField"
                defaultValue={radioValue}
                fullWidth
              />
            </div>

            <div className="button-footer">
              <Button
                className="skip"
                onClick={toggleBack}
                startIcon={<FaAngleDoubleLeft />}
                disabled={selectedIndex === 0}
              >
                {t('back')}
              </Button>
              <Button
                className={`vote-button ${hasPlayed ? 'no' : ''}`}
                onClick={() => updateValue()}
                startIcon={<FaSave />}
                disabled={!hasPlayed && radioValue !== ''}
              >
                {t('save')}
              </Button>
              <Button
                className="skip"
                onClick={toggleNext}
                endIcon={<FaAngleDoubleRight />}
                disabled={selectedIndex === audioList.length - 1}
              >
                {t('next')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ValidAudioPanelStyled>
  );
}

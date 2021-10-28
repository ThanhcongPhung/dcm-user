import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import api from '../../apis';
import { TableStyled } from './index.style';

const tableTitle = [
  'no',
  'roomName',
  'participant',
  'status',
  'numberValidatedAudio',
  'action',
];

export default function ValidRoom({ campaignId, validRoom, user, history }) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleJoin = async (item) => {
    const { data } = await api.validAudio.joinValidRoom(item.id, user.userId);
    if (data.status) {
      history.push(`/campaigns/${campaignId}/valid-audio/${item.id}`);
      return enqueueSnackbar(t('joinValidRoomSuccess'), {
        variant: 'success',
      });
    }
    return enqueueSnackbar(t('joinValidRoomFailure'), {
      variant: 'error',
    });
  };

  const handleNext = (item) => {
    history.push(`/campaigns/${campaignId}/valid-audio/${item.id}`);
  };

  return (
    <TableStyled>
      <Table className="table">
        <TableHead>
          <TableRow>
            {tableTitle &&
              tableTitle.map((item) => (
                <TableCell
                  key={item}
                  align="center"
                  variant="head"
                  className="headerCell"
                >
                  {t(item)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {validRoom &&
            validRoom.map((room, index) => (
              <TableRow key={room.id} className="bodyRow">
                <TableCell align="center" className="bodyCell">
                  {index + 1}
                </TableCell>
                <TableCell align="center" className="bodyCell nameBodyCell">
                  {room.name}
                </TableCell>
                <TableCell align="center" className="bodyCell">
                  {!room.userId ? t('empty') : room.userId}
                </TableCell>
                <TableCell align="center" className="bodyCell">
                  {room.status === 0 ? t('empty') : t('validating')}
                </TableCell>
                <TableCell align="center" className="bodyCell">
                  {room.validatedAudio.length}/{room.audioList.length}
                </TableCell>
                <TableCell align="center" className="bodyCell">
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {room.status === 0 ? (
                    <Button color="primary" onClick={() => handleJoin(room)}>
                      {t('join')}
                    </Button>
                  ) : room.userId === user.userId ? (
                    <Button
                      color="primary"
                      onClick={() => {
                        handleNext(room);
                      }}
                    >
                      {t('continue')}
                    </Button>
                  ) : (
                    ''
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableStyled>
  );
}

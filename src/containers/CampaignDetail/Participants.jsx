import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import CustomAvatar from '../../components/Avatar';
import Card from '../../components/Card';
import api from '../../apis';
import { MAX_ITEMS_SMALL, CAMPAIGN_ROLE } from '../../constants';
import { ParticipantsStyled } from './index.style';

export default function Participants({ campaignId }) {
  const { t } = useTranslation();
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(0);

  const handleChangePage = (value) => setPage(value);

  const fetchParticipantCampaign = async () => {
    const { data } = await api.campaign.getParticipants(campaignId);
    if (data.status) {
      const contributors = data.result.filter(
        (item) => item.role === CAMPAIGN_ROLE.CONTRIBUTOR,
      );
      setParticipants(contributors);
    }
  };

  useEffect(() => {
    if (campaignId) fetchParticipantCampaign({});
  }, []);

  return (
    <ParticipantsStyled>
      <Card
        flexDirection="column"
        padding="15px 8px 0 8px"
        minHeight="70vh"
        height="100%"
        margin="0"
      >
        <Typography variant="h6" align="center">
          {t('participantList')}
        </Typography>
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="tableCell">
                {t('no')}
              </TableCell>
              <TableCell align="center" className="tableCell">
                {t('name')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants &&
              participants
                .slice(
                  page * MAX_ITEMS_SMALL,
                  page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                )
                .map((participant, index) => (
                  <TableRow key={participant.userId} className="tableRow">
                    <TableCell align="center" className="tableCell">
                      {index + 1}
                    </TableCell>
                    <TableCell className="tableCell avatarName" align="center">
                      <CustomAvatar
                        avatar={participant.avatar}
                        name={participant.name}
                        number={moment(participant.createdAt).valueOf()}
                      />
                      <Typography className="userName" variant="body1">
                        {participant.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            {participants.length > MAX_ITEMS_SMALL && (
              <TablePagination
                rowsPerPageOptions={[]}
                count={participants.length}
                rowsPerPage={MAX_ITEMS_SMALL}
                page={page}
                onChangePage={(event, newPage) => handleChangePage(newPage)}
              />
            )}
          </TableBody>
        </Table>
      </Card>
    </ParticipantsStyled>
  );
}

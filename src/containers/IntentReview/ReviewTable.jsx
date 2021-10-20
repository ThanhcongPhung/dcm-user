import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import { TableStyled } from './index.style';
import ReviewTableRow from './ReviewTableRow';
import { PAGINATION } from '../../constants';

const tableTitle = [
  'no',
  'userSay',
  'duplicateNumber',
  'contributorIntent',
  'botIntent',
  'status',
  'comment',
];

export default function ReviewTable({
  userSays,
  onSetUserSays,
  isLoading,
  page,
  allIntents,
  campaignId,
}) {
  const { t } = useTranslation();

  const showUsersays = useMemo(
    () =>
      Object.values(userSays).slice(
        page * PAGINATION.TABLE_REVIEW,
        page * PAGINATION.TABLE_REVIEW + PAGINATION.TABLE_REVIEW,
      ),
    [userSays, page],
  );

  return (
    <TableStyled>
      <Table className="table">
        <TableHead>
          <TableRow>
            {tableTitle &&
              tableTitle.map((item) => (
                <TableCell key={item} align="center" className="headerCell">
                  {t(item)}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {showUsersays.map((usersayItem, index) => (
            <ReviewTableRow
              usersay={usersayItem}
              key={usersayItem.id}
              index={index}
              allIntents={allIntents}
              page={page}
              campaignId={campaignId}
              userSays={userSays}
              onSetUserSays={onSetUserSays}
            />
          ))}
          {isLoading && (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableStyled>
  );
}

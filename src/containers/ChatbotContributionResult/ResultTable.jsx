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
import ResultTableRow from './ResultTableRow';
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

export default function ResultTable({ userSays, isLoading, page, allIntents }) {
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
            <ResultTableRow
              usersay={usersayItem}
              key={usersayItem.id}
              index={index}
              allIntents={allIntents}
              page={page}
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

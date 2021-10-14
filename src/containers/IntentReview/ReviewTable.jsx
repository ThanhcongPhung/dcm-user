import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Checkbox,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { TableStyled } from './index.style';
import EditCommentDialog from './EditCommentDialog';

const tableTitle = [
  'no',
  'userSay',
  'botIntent',
  'editIntent',
  'status',
  'comment',
];

export default function ReviewTable({
  userSays,
  onSetUserSays,
  isLoading,
  pagination,
}) {
  const [editComment, setEditComment] = useState(null);

  const { t } = useTranslation();

  const handleEditComment = (comment) => {
    // TODO: call api edit comment
    const usersayId = editComment && editComment.id;
    if (usersayId && userSays[usersayId]) {
      const tempUsersays = userSays;
      tempUsersays[usersayId].comment = comment;
      onSetUserSays({ ...tempUsersays });
      setEditComment(null);
    }
  };

  const handleReview = (userSayId, value) => {
    if (userSays[userSayId]) {
      // TODO: call api review intent
      const tempUsersays = userSays;
      tempUsersays[userSayId].status = value;
      onSetUserSays({ ...tempUsersays });
    }
  };

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
          {Object.values(userSays).map((usersayItem, index) => (
            <TableRow
              className="bodyRow"
              key={usersayItem.id}
              onClick={() => handleReview(usersayItem.id, !usersayItem.status)}
            >
              <TableCell align="center" className="bodyCell">
                {(pagination.page - 1) * pagination.limit + index + 1}
              </TableCell>
              <TableCell align="left" className="bodyCell">
                {usersayItem.usersay}
              </TableCell>
              <TableCell align="left" className="bodyCell">
                {usersayItem.botIntent}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                {usersayItem.editIntent}
              </TableCell>
              <TableCell className="bodyCell checkboxCell">
                <Checkbox
                  color="primary"
                  checked={usersayItem.status}
                  onChange={() => handleReview(usersayItem.id, true)}
                />
                <Checkbox
                  className="checkbox noPass"
                  checked={!usersayItem.status}
                  onChange={() => handleReview(usersayItem.id, false)}
                />
              </TableCell>
              <TableCell align="center" className="bodyCell reviewComment">
                <Typography className="textComment">
                  {usersayItem.comment}
                </Typography>
                <Tooltip title={t('edit')} placement="top">
                  <Edit
                    color="primary"
                    className="editButton"
                    onClick={() => setEditComment(usersayItem)}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
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
      <EditCommentDialog
        open={!!editComment}
        handleClose={() => setEditComment(null)}
        onHandleEdit={handleEditComment}
        editComment={editComment}
      />
    </TableStyled>
  );
}

import React, { useState, useMemo } from 'react';
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
import { REVIEW_RESULT_STATUS, PAGINATION } from '../../constants';

const tableTitle = [
  'no',
  'userSay',
  'duplicateNumber',
  'intent',
  'initialIntent',
  'status',
  'comment',
];

export default function ReviewTable({
  userSays,
  onSetUserSays,
  isLoading,
  page,
  allIntents,
}) {
  const [editComment, setEditComment] = useState(null);

  const { t } = useTranslation();

  const showUsersays = useMemo(
    () =>
      Object.values(userSays).slice(
        page * PAGINATION.TABLE_REVIEW,
        page * PAGINATION.TABLE_REVIEW + PAGINATION.TABLE_REVIEW,
      ),
    [userSays, page],
  );

  const handleEditComment = (comment) => {
    // TODO: call api edit comment
    const usersayId = editComment && editComment.id;
    if (usersayId && userSays[usersayId]) {
      const tempUsersays = userSays;
      tempUsersays[usersayId].review = {
        ...userSays[usersayId].review,
        comment,
      };
      onSetUserSays({ ...tempUsersays });
      setEditComment(null);
    }
  };

  const handleReview = (usersayId, value) => {
    if (userSays[usersayId]) {
      // TODO: call api review intent
      const tempUsersays = userSays;
      tempUsersays[usersayId].review = {
        ...userSays[usersayId].review,
        status: value,
      };
      onSetUserSays({ ...tempUsersays });
    }
  };

  const getIntentDisplayName = (intentName) => {
    if (!intentName) return null;
    const intent = allIntents.find(
      (intentItem) => intentItem.name === intentName,
    );
    return intent ? intent.displayName : null;
  };

  const isPass = (status) => status === REVIEW_RESULT_STATUS.PASS;
  const isNotPass = (status) => status === REVIEW_RESULT_STATUS.NOT_PASS;

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
            <TableRow
              className={
                isNotPass(usersayItem.review && usersayItem.review.status)
                  ? 'bodyRow notPass'
                  : 'bodyRow'
              }
              key={usersayItem.id}
              // onClick={() => handleReview(usersayItem.id, !usersayItem.status)}
            >
              <TableCell align="center" className="bodyCell">
                {page * PAGINATION.TABLE_REVIEW + index + 1}
              </TableCell>
              <TableCell align="left" className="bodyCell">
                {usersayItem.content && usersayItem.content.text}
              </TableCell>
              <TableCell align="center" className="bodyCell">
                {usersayItem.duplicateNumber}
              </TableCell>
              <TableCell align="left" className="bodyCell">
                {getIntentDisplayName(usersayItem.nlu && usersayItem.nlu.name)}
              </TableCell>
              <TableCell align="left" className="bodyCell">
                {getIntentDisplayName(
                  usersayItem.nlu && usersayItem.nlu.botIntent,
                )}
              </TableCell>
              <TableCell className="bodyCell checkboxCell">
                <Checkbox
                  color="primary"
                  checked={isPass(
                    usersayItem.review && usersayItem.review.status,
                  )}
                  onChange={() =>
                    handleReview(usersayItem.id, REVIEW_RESULT_STATUS.PASS)
                  }
                />
                <Checkbox
                  className="checkbox noPass"
                  checked={isNotPass(
                    usersayItem.review && usersayItem.review.status,
                  )}
                  onChange={() =>
                    handleReview(usersayItem.id, REVIEW_RESULT_STATUS.NOT_PASS)
                  }
                />
              </TableCell>
              <TableCell align="center" className="bodyCell reviewComment">
                <Typography className="textComment">
                  {usersayItem.review && usersayItem.review.comment}
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
        getIntentDisplayName={getIntentDisplayName}
      />
    </TableStyled>
  );
}

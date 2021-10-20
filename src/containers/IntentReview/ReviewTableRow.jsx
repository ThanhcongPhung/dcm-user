import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Tooltip,
  Typography,
  Collapse,
  TablePagination,
  Icon,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import EditCommentDialog from './EditCommentDialog';
import DetailUsersayDialog from './DetailUsersayDialog';
import { PAGINATION, MAX_ITEMS_SMALL } from '../../constants';
import apis from '../../apis';

const tableTitleLevel2 = [
  'no',
  'userSay',
  'contributorIntent',
  'botIntent',
  'status',
  'comment',
];

export default function ReviewTableRow({
  userSays,
  onSetUserSays,
  usersay,
  page,
  allIntents,
  index,
  campaignId,
}) {
  const [chooseUsersay, setChooseUsersay] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);
  const [subPage, setSubPage] = useState(0);

  const { t } = useTranslation();

  const handleClickEdit = (usersayItem) => (e) => {
    e.stopPropagation();
    setEditComment(usersayItem);
  };

  const handleEditComment = async (comment) => {
    const usersayId = editComment && editComment.id;
    if (!userSays[usersayId]) return;
    const subUsersays = userSays[usersayId].subUsersays || [];
    const messageIds =
      subUsersays.length > 1 ? subUsersays.map((item) => item.id) : [usersayId];
    const { data } = await apis.chatbotReview.updateReview({
      messageIds,
      comment,
      campaignId,
    });
    if (data.status) {
      const tempUsersays = userSays;
      const newSubUsersays = subUsersays.map((item) => ({
        ...item,
        review: { ...item.review, comment },
      }));
      tempUsersays[usersayId].review = {
        ...userSays[usersayId].review,
        comment,
      };
      tempUsersays[usersayId].subUsersays = newSubUsersays;
      onSetUserSays({ ...tempUsersays });
    }
    setEditComment(null);
  };

  const handleClickUserSay = async (value) => {
    const usersayId = usersay.id;
    if (!userSays[usersayId]) return;
    const { subUsersays } = userSays[usersayId];
    const messageIds = subUsersays.map((item) => item.id);
    const { data } = await apis.chatbotReview.updateReview({
      messageIds,
      status: value,
      campaignId,
    });
    if (data.status) {
      const tempUsersays = userSays;
      const newSubUsersays = subUsersays.map((item) => ({
        ...item,
        review: { ...item.review, status: value },
      }));
      tempUsersays[usersayId].subUsersays = newSubUsersays;
      onSetUserSays({ ...tempUsersays });
    }
  };

  const handleClickSubUsersay = (subUsersayId) => async (e) => {
    const usersayId = usersay.id;
    if (!userSays[usersayId] || subUsersayId) return;
    const { data } = await apis.chatbotReview.updateReview({
      messageIds: [subUsersayId],
      status: e.target.checked,
      campaignId,
    });
    if (data.status) {
      const { subUsersays } = userSays[usersayId];
      const tempUsersays = userSays;
      const newSubUsersays = subUsersays.map((item) =>
        item.id === subUsersayId
          ? { ...item, review: { ...item.review, status: e.target.checked } }
          : item,
      );
      tempUsersays[usersayId].subUsersays = newSubUsersays;
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

  const handleClickRow = (usersayItem) => {
    if (usersayItem.duplicateNumber > 1) {
      setOpenCollapse(!openCollapse);
    } else {
      setChooseUsersay(usersayItem);
    }
  };

  const isPass = () => {
    const { subUsersays } = usersay;
    if (!subUsersays) return 0;
    const passUserSay = subUsersays.filter(
      (item) => item.review && item.review.status,
    );
    if (passUserSay.length === subUsersays.length) return 1;
    if (passUserSay.length === 0) return -1;
    return 0;
  };

  const ShowCheckBox = () => {
    const statusPass = isPass();
    switch (statusPass) {
      case 1:
        return (
          <Icon color="primary" onClick={() => handleClickUserSay(false)}>
            check_box
          </Icon>
        );
      case 0:
        return (
          <Icon color="primary" onClick={() => handleClickUserSay(false)}>
            indeterminate_check_box
          </Icon>
        );
      default:
        return (
          <Icon color="primary" onClick={() => handleClickUserSay(true)}>
            check_box_outline_blank
          </Icon>
        );
    }
  };

  return (
    <>
      <TableRow
        className={clsx('bodyRow', {
          notPass:
            usersay.review &&
            usersay.review.status &&
            usersay.review.status === false,
          chooseTableRow: openCollapse,
        })}
        key={usersay.id}
        onClick={() => handleClickRow(usersay)}
      >
        <TableCell align="center" className="bodyCell">
          {page * PAGINATION.TABLE_REVIEW + index + 1}
        </TableCell>
        <TableCell align="left" className="bodyCell">
          {usersay.content && usersay.content.text}
        </TableCell>
        <TableCell align="center" className="bodyCell">
          {usersay.duplicateNumber}
        </TableCell>
        <TableCell align="left" className="bodyCell">
          {getIntentDisplayName(usersay.nlu && usersay.nlu.name)}
        </TableCell>
        <TableCell align="left" className="bodyCell">
          {getIntentDisplayName(usersay.nlu && usersay.nlu.botIntent)}
        </TableCell>
        <TableCell
          className="bodyCell"
          padding="checkbox"
          onClick={(e) => e.stopPropagation()}
        >
          <ShowCheckBox />
        </TableCell>
        <TableCell align="center" className="bodyCell reviewComment">
          <Typography className="textComment">
            {usersay.review && usersay.review.comment}
          </Typography>
          <Tooltip title={t('edit')} placement="top">
            <Edit
              color="primary"
              className="editButton"
              onClick={handleClickEdit(usersay)}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="tableCellCollapse" colSpan={7}>
          <Collapse in={!!openCollapse} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell />
                  {tableTitleLevel2 &&
                    tableTitleLevel2.map((item) => (
                      <TableCell
                        key={item}
                        align="center"
                        className="headerCellLevel2"
                      >
                        {t(item)}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersay &&
                  usersay.subUsersays &&
                  usersay.subUsersays
                    .slice(
                      subPage * MAX_ITEMS_SMALL,
                      subPage * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                    )
                    .map((item, subIndex) => {
                      return (
                        <TableRow
                          className={clsx('bodyRow', {
                            notPass:
                              item.review &&
                              item.review.status &&
                              item.review.status === false,
                          })}
                          key={item.id}
                          onClick={() => setChooseUsersay(usersay)}
                        >
                          <TableCell />
                          <TableCell align="center" className="bodyCell">
                            {subPage * MAX_ITEMS_SMALL + subIndex + 1}
                          </TableCell>
                          <TableCell align="center" className="bodyCell">
                            {item.content && item.content.text}
                          </TableCell>
                          <TableCell align="center" className="bodyCell">
                            {getIntentDisplayName(item.nlu && item.nlu.name)}
                          </TableCell>
                          <TableCell align="center" className="bodyCell">
                            {getIntentDisplayName(
                              item.nlu && item.nlu.botIntent,
                            )}
                          </TableCell>
                          <TableCell
                            className="bodyCell"
                            padding="checkbox"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.review && item.review.status}
                            <Checkbox
                              color="primary"
                              checked={item.review && item.review.status}
                              onChange={handleClickSubUsersay(item.id)}
                            />
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bodyCell reviewComment"
                          >
                            <Typography className="textComment">
                              {item.review && item.review.comment}
                            </Typography>
                            <Tooltip title={t('edit')} placement="top">
                              <Edit
                                color="primary"
                                className="editButton"
                                onClick={handleClickEdit(item)}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
              {usersay &&
                usersay.subUsersays &&
                usersay.subUsersays.length > MAX_ITEMS_SMALL && (
                  <TablePagination
                    rowsPerPageOptions={[]}
                    count={
                      usersay &&
                      usersay.subUsersays &&
                      usersay.subUsersays.length
                    }
                    rowsPerPage={MAX_ITEMS_SMALL}
                    page={subPage}
                    onPageChange={(event, newPage) => setSubPage(newPage)}
                  />
                )}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditCommentDialog
        open={!!editComment}
        handleClose={() => setEditComment(null)}
        onHandleEdit={handleEditComment}
        editComment={editComment}
        getIntentDisplayName={getIntentDisplayName}
      />
      <DetailUsersayDialog
        open={!!chooseUsersay}
        chooseUsersayId={chooseUsersay && chooseUsersay.id}
        senderId={
          chooseUsersay && chooseUsersay.sender && chooseUsersay.sender.user
        }
        handleClose={() => setChooseUsersay(null)}
        campaignId={campaignId}
      />
    </>
  );
}

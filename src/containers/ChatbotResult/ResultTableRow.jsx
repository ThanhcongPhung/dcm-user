import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  TablePagination,
  Icon,
} from '@material-ui/core';
import { PAGINATION, MAX_ITEMS_SMALL } from '../../constants';

const tableTitleLevel2 = [
  'no',
  'userSay',
  'contributorIntent',
  'botIntent',
  'status',
  'comment',
];

export default function ResultTableRow({ usersay, page, allIntents, index }) {
  const [openCollapse, setOpenCollapse] = useState(null);
  const [subPage, setSubPage] = useState(0);

  const { t } = useTranslation();

  const getIntentDisplayName = (intentName) => {
    if (!intentName) return null;
    const intent = allIntents.find(
      (intentItem) => intentItem.name === intentName,
    );
    return intent ? intent.displayName : null;
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
        return <Icon color="primary">check_box</Icon>;
      case 0:
        return <Icon color="primary">indeterminate_check_box</Icon>;
      default:
        return <Icon color="primary">check_box_outline_blank</Icon>;
    }
  };

  const handleClickRow = (usersayItem) => {
    if (usersayItem.duplicateNumber > 1) {
      setOpenCollapse(!openCollapse);
    }
  };

  const isReject = (status) => {
    if (status === undefined) return false;
    return !status;
  };

  return (
    <>
      <TableRow
        className={clsx('bodyRow', {
          notPass: isReject(usersay.review && usersay.review.status),
          chooseTableRow: openCollapse,
          isPointer: usersay.duplicateNumber > 1,
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
        <TableCell className="bodyCell" padding="checkbox">
          <div className="checkboxWrapper">
            <ShowCheckBox />
          </div>
        </TableCell>
        <TableCell align="center" className="bodyCell reviewComment">
          {usersay.review && usersay.review.comment}
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
                            notPass: isReject(
                              item.review && item.review.status,
                            ),
                          })}
                          key={item.id}
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
                          <TableCell className="bodyCell" padding="checkbox">
                            {item.review && item.review.status ? (
                              <Icon color="primary">check_box</Icon>
                            ) : (
                              <Icon color="primary">
                                check_box_outline_blank
                              </Icon>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            className="bodyCell reviewComment"
                          >
                            {item.review && item.review.comment}
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
    </>
  );
}

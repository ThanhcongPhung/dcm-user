import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  List,
  ListItemText,
  ListItem,
  TablePagination,
} from '@material-ui/core';
import { MAX_ITEMS_SMALL } from '../../../constants';
import { DetailIntentStyled } from './index.style';

export default function DetailIntent({ intents }) {
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

  const handleChangePage = (e, value) => setPage(value);

  const ListItemIntent = ({ name, index }) => (
    <ListItem className="listItem">
      <ListItemText
        primary={`${page * MAX_ITEMS_SMALL + index + 1}:  ${name}`}
      />
    </ListItem>
  );

  return (
    <DetailIntentStyled>
      <Typography variant="h6" component="h6" gutterBottom className="title">
        {t('intentInfo')}
      </Typography>
      <List className="list">
        {intents &&
          intents
            .slice(
              page * MAX_ITEMS_SMALL,
              page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
            )
            .map((intent, index) => (
              <ListItemIntent
                name={intent.displayName}
                index={index}
                key={intent.id}
              />
            ))}
        {intents && intents.length > MAX_ITEMS_SMALL && (
          <TablePagination
            rowsPerPageOptions={[]}
            count={intents.length}
            rowsPerPage={MAX_ITEMS_SMALL}
            page={page}
            onPageChange={handleChangePage}
            className="tablePagination"
          />
        )}
      </List>
    </DetailIntentStyled>
  );
}

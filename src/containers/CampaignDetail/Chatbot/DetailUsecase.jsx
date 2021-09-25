import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
  ListItem,
  List,
  TablePagination,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MAX_ITEMS_SMALL } from '../../../constants';
import { DetailUsecaseStyled } from './index.style';

export default function DetailUsecase({ usecases }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState();

  const handleExpanded = (panel) => (event, isExpanded) => {
    setPage(0);
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangePage = (e, value) => setPage(value);

  const ListItemIntent = ({ name, index }) => (
    <ListItem className="listItem">
      <ListItemText
        primary={`${page * MAX_ITEMS_SMALL + index + 1}:  ${name}`}
      />
    </ListItem>
  );

  return (
    <DetailUsecaseStyled>
      <Typography variant="h6" component="h6" gutterBottom className="title">
        {t('usecaseInfo')}
      </Typography>
      <div className="content">
        {usecases.map((usecase, index) => (
          <Accordion
            key={usecase.id}
            expanded={expanded === index}
            onChange={handleExpanded(index)}
            square
            classes={{ root: 'accordionItem' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="body1">
                <span className="title">
                  {t('usecase')} {index + 1}:
                </span>
                <span>{` ${usecase.name}`}</span>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                <span className="title">{t('usecaseDescription')}:</span>
                <span> {` ${usecase.description}`}</span>
              </Typography>
            </AccordionDetails>
            <AccordionDetails className="detailContent">
              <Typography variant="body1" className="title">
                {t('intentList')}
              </Typography>
              <List className="list">
                {usecase.intents &&
                  usecase.intents
                    .slice(
                      page * MAX_ITEMS_SMALL,
                      page * MAX_ITEMS_SMALL + MAX_ITEMS_SMALL,
                    )
                    .map((intent, intentIndex) => (
                      <ListItemIntent
                        name={intent.displayName}
                        index={intentIndex}
                        key={intent.id}
                      />
                    ))}
                {usecase.intents &&
                  usecase.intents.length > MAX_ITEMS_SMALL && (
                    <TablePagination
                      rowsPerPageOptions={[]}
                      count={usecase.intents.length}
                      rowsPerPage={MAX_ITEMS_SMALL}
                      page={page}
                      onPageChange={handleChangePage}
                      className="tablePagination"
                    />
                  )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </DetailUsecaseStyled>
  );
}

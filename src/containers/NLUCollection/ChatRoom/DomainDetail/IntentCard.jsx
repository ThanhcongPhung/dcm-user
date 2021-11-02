/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Checkbox,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { USER_ROLE } from '../../../../constants/nlu';
import { IntentCardStyled } from './index.style';

function CheckboxList({ items, role, isMainIntent }) {
  return (
    <List>
      {items &&
        Array.isArray(items) &&
        items.map((item, index) => (
          <ListItem key={index} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                tabIndex={-1}
                disableRipple
                checked={Boolean(item.value)}
                inputProps={{ 'aria-labelledby': index }}
              />
            </ListItemIcon>

            <ListItemText id={index}>
              {item.slot.name}
              {item.value &&
                (role === USER_ROLE.AGENT || !isMainIntent) &&
                `: ${item.value}`}
              {item.defaultValue &&
                isMainIntent &&
                role === USER_ROLE.CLIENT &&
                `: ${item.defaultValue}`}
            </ListItemText>
          </ListItem>
        ))}
    </List>
  );
}

function IntentCard({ intent, role, isMainIntent }) {
  const { t } = useTranslation();
  if (!intent) return <CircularProgress />;
  return (
    <IntentCardStyled>
      <Typography variant="body1" gutterBottom className="secondaryText">
        {t('intent')}: {intent.name}
      </Typography>
      <CheckboxList
        items={intent.slots}
        role={role}
        isMainIntent={isMainIntent}
      />
    </IntentCardStyled>
  );
}

export default IntentCard;

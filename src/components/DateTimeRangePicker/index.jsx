import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Icon,
  Popover,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { DateTimeRangePickerStyled } from './index.style';

const defaultProps = {
  defaultValue: [moment().subtract(1, 'months'), moment()],
  cbChangeRange() {},
  blocks: [
    { label: 'today', range: [moment().startOf('day'), moment().endOf('day')] },
    {
      label: 'yesterday',
      range: [
        moment().startOf('day').subtract(1, 'day'),
        moment().startOf('day').subtract(1, 'milliseconds'),
      ],
    },
    {
      label: 'weekAgo',
      range: [
        moment().startOf('day').subtract(1, 'week').add(1, 'day'),
        moment().endOf('day'),
      ],
    },
    {
      label: 'monthAgo',
      range: [
        moment().startOf('day').subtract(1, 'month').add(1, 'day'),
        moment().endOf('day'),
      ],
    },
  ],
};

function DateTimeRangePicker({ defaultValue, cbChangeRange, blocks }) {
  const [selectedRange, setSelectedRange] = useState(defaultValue);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openRangeBlocks = Boolean(anchorEl);
  const [fromDate, toDate] = selectedRange;
  const open = openDatePicker || openRangeBlocks;

  const { t } = useTranslation();

  const handleOpenDateTimePicker = () => setOpenDatePicker(true);
  const handleCloseDateTimePicker = () => setOpenDatePicker(false);

  const setFromDate = (datetime) => setSelectedRange([datetime, toDate]);
  const setToDate = (datetime) => setSelectedRange([fromDate, datetime]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const selectBlockRange = (range) => {
    setSelectedRange(range);
    setAnchorEl(null);
  };

  function checkSelected(rangeItem) {
    const [startDate, endDate] = rangeItem;
    const [selectedStartDate, selectedEndDate] = selectedRange;
    return (
      moment(startDate).isSame(selectedStartDate) &&
      moment(endDate).isSame(selectedEndDate)
    );
  }

  useEffect(() => {
    if (!open) cbChangeRange(selectedRange);
  }, [open]);

  useEffect(() => {
    if (defaultValue !== selectedRange) setSelectedRange(defaultValue);
  }, [defaultValue]);

  return (
    <DateTimeRangePickerStyled variant="outlined">
      <Box className="datePicker">
        <DateTimePicker
          variant="inline"
          value={fromDate}
          format="DD/MM/YYYY HH:mm"
          onChange={setFromDate}
          onOpen={handleOpenDateTimePicker}
          onClose={handleCloseDateTimePicker}
          maxDate={toDate}
          maxDateMessage={t('dateShouldNotAfterMaximalDate')}
        />
      </Box>
      <Box className="dividerDateRange">{` - `}</Box>
      <Box className="datePicker">
        <DateTimePicker
          variant="inline"
          value={toDate}
          onChange={setToDate}
          format="DD/MM/YYYY HH:mm"
          onOpen={handleOpenDateTimePicker}
          onClose={handleCloseDateTimePicker}
          disableFuture
        />
      </Box>
      <Box className="iconMore" onClick={handleClick}>
        <Icon>expand_more</Icon>
      </Box>
      <Popover
        open={openRangeBlocks}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <List component="nav">
          {blocks.map(({ label, range }) => (
            <ListItem
              key={t(label)}
              button
              onClick={() => selectBlockRange(range)}
              selected={checkSelected(range)}
            >
              <ListItemText primary={t(label)} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </DateTimeRangePickerStyled>
  );
}

DateTimeRangePicker.defaultProps = defaultProps;

export default DateTimeRangePicker;

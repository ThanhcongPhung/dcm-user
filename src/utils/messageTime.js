import moment from 'moment';

export const getDateInfo = (date) => {
  const today = moment();
  const someday = moment(date);
  const dateInfo = {
    day: someday.format('YYYY-MM-DD'),
    fullTime: someday.format('YYYY-MM-DD HH:mm'),
  };
  const isSameDay = today.format('YYYY-MM-DD') === someday.format('YYYY-MM-DD');
  return isSameDay ? { ...dateInfo, time: someday.format('HH:mm') } : dateInfo;
};

import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';

function humanizeEventDate(date, format = DATE_FORMAT) {
  return date ? dayjs(date).format(format).toUpperCase() : '';
}

function humanizeTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeDuration(dateFrom, dateTo) {
  const diffInMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  if (diffInMinutes < 60) {
    return `${diffInMinutes}M`;
  }

  if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return minutes === 0
      ? `${String(hours).padStart(2, '0')}H`
      : `${String(hours).padStart(2, '0')}H${String(minutes).padStart(2, '0')}M`;
  }

  const daysCount = Math.floor(diffInMinutes / 1440);
  const restHoursCount = Math.floor((diffInMinutes % 1440) / 60);
  const restMinutesCount = diffInMinutes % 60;

  if (restHoursCount === 0 && restMinutesCount === 0) {
    return `${String(daysCount).padStart(2, '0')}D`;
  }

  if (restMinutesCount === 0) {
    return `${String(daysCount).padStart(2, '0')}D${String(restHoursCount).padStart(2, '0')}H`;
  }

  return `${String(daysCount).padStart(2, '0')}D${String(restHoursCount).padStart(2, '0')}H${String(restMinutesCount).padStart(2, '0')}M`;
}

export { humanizeEventDate, humanizeTime, humanizeDuration };

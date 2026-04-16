import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const TRIP_DAY_FORMAT = 'DD';
const TRIP_MONTH_DAY_FORMAT = 'DD MMM';
const TRIP_MONTH_FORMAT = 'MMM';

function humanizeEventDate(date, format = DATE_FORMAT) {
  return date ? dayjs(date).format(format).toUpperCase() : '';
}

function humanizeTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function humanizeTripDates(dateFrom, dateTo) {
  if (!dateFrom || !dateTo) {
    return '';
  }

  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);

  if (startDate.isSame(endDate, 'month')) {
    return `${startDate.format(TRIP_DAY_FORMAT)} — ${endDate.format(TRIP_MONTH_DAY_FORMAT)}`;
  }

  return `${startDate.format(TRIP_MONTH_DAY_FORMAT)} — ${endDate.format(TRIP_MONTH_DAY_FORMAT)}`;
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

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointTime(pointA, pointB) {
  const durationPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationPointB - durationPointA;
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function isDatesEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dayjs(dateB));
}

export { humanizeEventDate, humanizeTime, humanizeTripDates, humanizeDuration, sortPointDay, sortPointTime, sortPointPrice, isDatesEqual };

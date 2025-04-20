import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIME_UNIT = {
  MILLISECOND: 1000,
  SECOND: 60,
  MINUTE: 60,
  HOUR: 24,
};

export const useTime = (targetTimezone) => {
  const validateDateFormat = (date, format) =>
    dayjs(date, format).format(format) === date;

  const formatTimestamp = (data, format) => {
    const targetFormat = format || "YYYY-MM-DD HH:mm:ss";
    return dayjs(data).tz(targetTimezone).format(targetFormat);
  };

  const getUtcOffset = (data, unit) => {
    const targetUnit = unit || "HOUR";
    const offsetInMinute = dayjs(data).tz(targetTimezone).utcOffset();
    return targetUnit === "HOUR"
      ? offsetInMinute / TIME_UNIT.SECOND
      : offsetInMinute;
  };

  const getDateByTimezone = (date, time, tz) => {
    return dayjs.tz(`${date} ${time}`, tz).utc();
  } 

  return {
    validateDateFormat,
    formatTimestamp,
    getUtcOffset,
    getDateByTimezone,
  };
};
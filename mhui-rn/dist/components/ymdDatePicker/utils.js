const LeapYear = year => year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;

const MonthAllDate = (month, year) => {
  month = month.toString();
  if (/^(1|3|5|7|8|10|12)$/.test(month)) return 31;
  if (/^(4|6|9|11)$/.test(month)) return 30;
  if (/^2$/.test(month) && LeapYear(year)) return 29;
  return 28;
};

export const InitAllDate = (year, month, first = 0, adjacent = false) => {
  const fullDate = MonthAllDate(month, year);
  const fix = [new Date(year, month - 1, 1), new Date(year, month - 1, fullDate)];
  const week = fix[0].getDay() - first;
  const content = [new Array(week < 0 ? week + 7 : week).fill(undefined)];

  for (let i = 0; i < fullDate; i++) {
    let index = content.length - 1;

    if (content[index].length === 7) {
      content.push([]);
      index += 1;
    }

    content[index].push(new Date(year, month - 1, i + 1));
  }

  const index = content.length - 1;
  content[index] = content[index].concat(new Array(7 - content[index].length).fill(undefined));

  if (adjacent) {
    for (let i = content[0].length - 1; i >= 0; i--) {
      if (!content[0][i]) {
        fix[0].setTime(fix[0].getTime() - 1000 * 60 * 60 * 24);
        content[0][i] = new Date(fix[0]);
      }
    }

    for (let i = 0; i < content[index].length; i++) {
      if (!content[index][i]) {
        fix[1].setTime(fix[1].getTime() + 1000 * 60 * 60 * 24);
        content[index][i] = new Date(fix[1]);
      }
    }
  }

  return content;
};
export const FormatDate = (date, time = false) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let format = `${year}-${month}-${day}`;

  if (time) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    format += ` ${hour}:${minute}:${second}`;
  }

  return format;
};
export const GetRangeDate = (from, to) => {
  from = new Date(from);
  to = new Date(to);
  if (from > to) [from, to] = [to, from];
  const dates = [from];
  if (from.getTime() === to.getTime()) return dates;
  let last = dates[dates.length - 1];
  const jetlag = 1000 * 60 * 60 * 24;

  while (to.getTime() - last.getTime() > jetlag) {
    const day = new Date(last.getTime() + jetlag);
    dates.push(day);
    last = dates[dates.length - 1];
  }

  dates.push(to);
  return dates;
};
export const InitDates = (date, range = false) => {
  let dates;
  if (Array.isArray(date)) dates = date.map(v => InitDates(v)[0]);else dates = [FormatDate(new Date(date))];

  if (range) {
    dates = GetRangeDate(dates[0], dates[1] || dates[0]).map(v => FormatDate(v));
  }

  return dates.sort();
};
export const ResortWeek = (week, first) => {
  const a = week.slice(0, first);
  const b = week.slice(first);
  return b.concat(a);
};

const CreateUTCDate = (year, month = 0, day = 1) => {
  let date;

  if (year < 100 && year >= 0) {
    date = new Date(Date.UTC(year, month, day));

    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(year);
    }
  } else {
    date = new Date(Date.UTC(year, month, day));
  }

  return date;
};

const FirstWeekOffset = (year, first, firstDayOfYear) => {
  const firstWeekDayInFirstWeek = 7 + first - firstDayOfYear;
  const firstWeekDayOfYear = (7 + CreateUTCDate(year, 0, firstWeekDayInFirstWeek).getUTCDay() - first) % 7;
  return -firstWeekDayOfYear + firstWeekDayInFirstWeek - 1;
};

const DayOfYear = (year, month, day) => {
  let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][month];

  if (month > 1 && LeapYear(year)) {
    dayOfYear += 1;
  }

  return dayOfYear + day;
};

const WeeksInYear = (year, first, firstDayOfYear) => {
  const weekOffset = FirstWeekOffset(year, first, firstDayOfYear);
  const weekOffsetNext = FirstWeekOffset(year + 1, first, firstDayOfYear);
  const daysInYear = LeapYear(year) ? 366 : 365;
  return (daysInYear - weekOffset + weekOffsetNext) / 7;
};

const WeekNumber = (date, first, locale) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const weekOffset = FirstWeekOffset(year, first, locale);
  const week = Math.ceil((DayOfYear(year, month, day) - weekOffset) / 7);
  if (week < 1) return week + WeeksInYear(year - 1, first, locale);

  if (week > WeeksInYear(year, first, locale)) {
    return week - WeeksInYear(year, first, locale);
  }

  return week;
};

export const GiveArrayWeek = (content, weeks, first = 0, local = 4) => {
  weeks.unshift('周');
  const index = content.length - 1;
  const interval = [WeekNumber(content[0][6], first, local), WeekNumber(content[index][0], first, local)];

  if (interval[0] > interval[1]) {
    content[0].unshift(interval[0]);
    interval[0] = 0;
  }

  for (let i = interval[0] || 1; i <= interval[1]; i++) {
    content[i - interval[0]].unshift(i);
  }
};
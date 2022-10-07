// return -1 if valid, index of invalid if invalid
export default (date: string) => {
  const length = date.length;
  const month = parseInt(date.substr(0, 2));
  const day = parseInt(date.substr(2, 2));
  const year = parseInt(date.substr(4, 4));
  const now = new Date();

  switch (length) {
    case 0:
      return -1;
    case 1:
      if (month < 2) {
        return -1;
      }
      return length - 1;
    case 2:
      if (month < 1 || month > 12) {
        return length - 1;
      }
      return -1;
    case 3:
      if (month === 2 && day < 3) {
        return -1;
      }
      if (month !== 2 && day < 4) {
        return -1;
      }
      return length - 1;
    case 4:
      if (day < 1 || day > 31) {
        return length - 1;
      }
      if (month === 2 && day > 29) {
        return length - 1;
      }
      if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day > 30
      ) {
        return length - 1;
      }
      return -1;
    case 5:
      if (year < 1 || year > 2) {
        return length - 1;
      }
      return -1;
    case 6:
      if (year < 19) {
        return length - 1;
      }
      const currCentury = Math.trunc(now.getFullYear() / 100);
      if (currCentury < year) {
        return length - 1;
      }
      return -1;
    case 7:
      const currDecade = Math.trunc(now.getFullYear() / 10);
      if (currDecade < year) {
        return length - 1;
      }
      return -1;
    case 8:
      const fullDate = new Date(year, month - 1, day);
      const ageInMilliseconds = now.getTime() - fullDate.getTime();
      if (ageInMilliseconds < 0) {
        return length - 1;
      }
      if (month == 2 && day == 29) {
        if (!isLeap(year)) {
          return -1;
        }
        return length - 1;
      }
      return -1;
    default:
      return;
  }
};

const isLeap = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

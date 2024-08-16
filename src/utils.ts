export const TITANBLUE = "#094c7c";
export const TITANORANGE = "#f7941f";
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getLastSixMonths = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  // const currentMonth = 4;
  const sixMonthsList = [];
  let startMonth = currentMonth - 5;
  if (startMonth < 0) {
    startMonth = 12 + startMonth;
  }
  while (sixMonthsList.length != 6) {
    if (startMonth > 11) {
      startMonth = 0;
    }
    sixMonthsList.push(MONTHS[startMonth]);
    startMonth++;
  }
  return sixMonthsList;
};

export const getLastTwelveMonths = () => {
  const date = new Date();
  const currentMonth = date.getMonth();
  const twelveMonthsList = [];
  let startMonth = currentMonth - 11;
  if (startMonth < 0) {
    startMonth = 12 + startMonth;
  }
  while (twelveMonthsList.length != 12) {
    if (startMonth > 11) {
      startMonth = 0;
    }
    twelveMonthsList.push(MONTHS[startMonth]);
    startMonth++;
  }
  return twelveMonthsList;
};

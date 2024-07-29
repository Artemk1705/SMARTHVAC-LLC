function dateTime() {
  const time = new Date();

  const year = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return { year, month, day, hours, minutes };
}
// Time updater
function CurrentTime() {
  const current = dateTime();
  return current;
}

setInterval(CurrentTime, 30000);

// total days in month
export function daysInMonth(year, month) {
  const totalDays = new Date(year, month, 0);
  return totalDays.getDate();
}

export function сurrentMonthAndYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return daysInMonth(currentYear, currentMonth);
}

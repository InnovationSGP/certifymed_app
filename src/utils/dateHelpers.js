// dateHelpers.js

/**
 * Returns all calendar days for a given month, organized by weeks
 * @param {Date} date - Any date within the desired month
 * @returns {Date[][]} Array of weeks, each containing 7 date objects
 */
export const getCalendarDays = (date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const days = [];

  let currentDay = new Date(start);
  currentDay.setDate(currentDay.getDate() - currentDay.getDay()); // Start from Sunday

  while (currentDay <= end) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    days.push(week);
  }

  return days;
};

/**
 * Returns details for three consecutive days starting from the given date
 * @param {Date} date - Starting date
 * @returns {Array<{date: Date, dayName: string, dayNumber: number}>}
 */
export const getThreeDayView = (date) => {
  return Array.from({ length: 3 }, (_, i) => {
    const currentDate = new Date(date);
    currentDate.setDate(date.getDate() + i);
    return {
      date: currentDate,
      dayName: currentDate.toLocaleString("default", { weekday: "short" }),
      dayNumber: currentDate.getDate(),
    };
  });
};

/**
 * Returns formatted details for the next three weekdays from a given date
 * @param {Date} date - Starting date
 * @returns {Array<{name: string, date: string, fullDate: Date}>}
 */
export const getWeekDays = (date) => {
  const days = [];
  const currentDay = new Date(date);

  for (let i = 0; i < 3; i++) {
    const dayDate = new Date(currentDay);
    dayDate.setDate(currentDay.getDate() + i);
    days.push({
      name: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        dayDate
      ),
      date: dayDate.getDate().toString().padStart(2, "0"),
      fullDate: dayDate,
    });
  }

  return days;
};

/**
 * Generates time slots between 9:00 and 21:00
 * @returns {Array<{time: number, label: string}>}
 */
export const generateTimeSlots = () => {
  return Array.from({ length: 13 }, (_, i) => ({
    time: i + 9,
    label: `${(i + 9) % 12 || 12}:00${i + 9 >= 12 ? "pm" : "am"}`,
  }));
};

/**
 * Returns all possible time options for a 24-hour period
 * @returns {string[]} Array of formatted time strings
 */
export const getTimeOptions = () => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? "am" : "pm";
    return `${hour}:00${period}`;
  });
};

/**
 * Calculates the end time given a start time and duration
 * @param {string} startTime - Start time in "HH:mm" format
 * @param {number} durationMinutes - Duration in minutes
 * @returns {string} End time in "HH:mm" format
 */
export const getEndTime = (startTime, durationMinutes) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes + durationMinutes);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
};

/**
 * Returns the number of days in a given month
 * @param {Date} date - Any date within the desired month
 * @returns {number} Number of days in the month
 */
export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

/**
 * Returns the day of week (0-6) for the first day of the month
 * @param {Date} date - Any date within the desired month
 * @returns {number} Day of week (0-6)
 */
export const getFirstDayOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
};

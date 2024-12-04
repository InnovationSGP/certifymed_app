// utils.js
export const generateTimeSlots = () => {
  return Array.from({ length: 13 }, (_, i) => ({
    time: i + 9,
    label: `${(i + 9) % 12 || 12}:00${i + 9 >= 12 ? "pm" : "am"}`,
  }));
};

export const getTimeOptions = () => [
  "12:00am",
  "1:00am",
  "2:00am",
  "3:00am",
  "4:00am",
  "5:00am",
  "6:00am",
  "7:00am",
  "8:00am",
  "9:00am",
  "10:00am",
  "11:00am",
  "12:00pm",
  "1:00pm",
  "2:00pm",
  "3:00pm",
  "4:00pm",
  "5:00pm",
  "6:00pm",
  "7:00pm",
  "8:00pm",
  "9:00pm",
  "10:00pm",
  "11:00pm",
];

export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getFirstDayOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1;
};

export const getThreeDayView = (currentDate) => {
  return Array.from({ length: 3 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    return {
      date,
      dayName: date.toLocaleString("default", { weekday: "short" }),
      dayNumber: date.getDate(),
    };
  });
};

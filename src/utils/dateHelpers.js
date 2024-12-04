const getCalendarDays = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = [];

  let currentDay = startOfWeek(start);
  while (currentDay <= endOfMonth(end)) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
    days.push(week);
  }

  return days;
};

const getWeekDays = (date) => {
  const start = startOfWeek(date);
  const days = [];

  for (let i = 0; i < 3; i++) {
    const currentDay = new Date(start);
    currentDay.setDate(currentDay.getDate() + i);
    days.push({
      name: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
        currentDay
      ),
      date: currentDay.getDate().toString().padStart(2, "0"),
      fullDate: currentDay,
    });
  }

  return days;
};

const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 21; i++) {
    slots.push(`${i}:00`);
  }
  return slots;
};

const getEndTime = (startTime, durationMinutes) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes + durationMinutes);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });
};

// Mock data
const mockAppointments = [
  {
    id: 1,
    title: "Medical Consultation",
    date: "2024-03-02",
    time: "11:00",
    durationMinutes: 60,
  },
  {
    id: 2,
    title: "Medical Consultation",
    date: "2024-03-02",
    time: "15:00",
    durationMinutes: 90,
  },
];

const Calendar = ({ selectedDate, onDateSelect }) => {
  const weeks = getCalendarDays(selectedDate);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-72">
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <div key={day} className="text-gray-500 py-2">
            {day}
          </div>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <button
              key={`${weekIndex}-${dayIndex}`}
              onClick={() => onDateSelect(day)}
              className={`
                p-2 rounded-full hover:bg-gray-100
                ${
                  isSameDay(day, selectedDate)
                    ? "bg-indigo-700 text-white hover:bg-indigo-800"
                    : ""
                }
                ${!isSameMonth(day, selectedDate) ? "text-gray-400" : ""}
              `}
            >
              {day.getDate()}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;

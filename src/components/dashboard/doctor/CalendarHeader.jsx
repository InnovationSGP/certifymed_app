import {
  Calendar as Calendar1Icon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CalendarHeader = ({ currentDate, onNavigate, onToggleCalendar }) => {
  // Create a formatted date string that will be consistent between server and client
  const formatDate = (date) => {
    // Use a consistent locale and format options
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      timeZone: "UTC", // Use UTC to ensure consistency
    });
  };

  return (
    <div className="flex justify-between w-full items-center mb-5 lg:mb-8">
      <span className="text-cabaretCharm text-[13px] sm:text-[15px]">
        GMT +01
      </span>
      <div className="flex items-center gap-3 lg:gap-[25px]">
        <span className="text-cabaretCharm text-[13px] sm:text-[15px]">
          {formatDate(currentDate)}
        </span>
        <Calendar1Icon
          onClick={onToggleCalendar}
          className="xl:hidden"
          stroke="#7D8DA6"
          size={20}
        />
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate("prev")}
            className="p-1.5 sm:p-2 bg-blueGray hover:bg-slate-400 rounded group"
          >
            <ChevronLeft
              stroke="#7D8DA6"
              className="group-hover:stroke-black"
              size={20}
            />
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="p-1.5 sm:p-2 bg-blueGray hover:bg-slate-400 rounded group"
          >
            <ChevronRight
              stroke="#7D8DA6"
              className="group-hover:stroke-black"
              size={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;

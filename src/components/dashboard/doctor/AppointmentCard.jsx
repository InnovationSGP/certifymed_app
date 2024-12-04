const AppointmentCard = ({ appointment }) => {
  return (
    <div
      className="absolute w-full bg-blue-500 text-white rounded-lg p-2 z-10"
      style={{
        top: 0,
        height: `${appointment.durationMinutes * (100 / 60)}%`,
        minHeight: "60px",
      }}
    >
      <div className="text-sm font-medium">{appointment.title}</div>
      <div className="text-xs">
        {appointment.time} -{" "}
        {getEndTime(appointment.time, appointment.durationMinutes)}
      </div>
      <div className="flex items-center gap-1 mt-1">
        <div className="w-6 h-6 rounded-full bg-white/20" />
        <div className="w-6 h-6 rounded-full bg-white/20" />
      </div>
    </div>
  );
};

export default AppointmentCard;

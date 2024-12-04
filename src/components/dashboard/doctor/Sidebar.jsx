import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Sidebar = ({ onClose }) => {
  const [title, setTitle] = useState("Medical Consultation");
  const [duration, setDuration] = useState(30);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const sidebarRef = useRef(null);
  const [availability, setAvailability] = useState({
    sun: { available: false },
    mon: { available: true, hours: ["9:00am", "5:00pm"] },
    tue: { available: true, hours: ["9:00am", "5:00pm"] },
    wed: { available: true, hours: ["9:00am", "5:00pm"] },
    thu: { available: true, hours: ["9:00am", "5:00pm"] },
    fri: { available: true, hours: ["9:00am", "5:00pm"] },
    sat: { available: true, hours: ["9:00am", "5:00pm"] },
  });

  useEffect(() => {
    setIsEntering(false);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500); // Match with the animation duration
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-5 transition-opacity duration-500 ease-in-out">
      <div
        ref={sidebarRef}
        className={`absolute right-0 top-0 bottom-0 w-96 bg-white shadow-[-16px_0px_34px_0px_rgba(176,179,189,0.05)] transform transition-transform duration-500 ease-in-out ${
          isClosing
            ? "translate-x-full"
            : isEntering
            ? "translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Appointment Schedule</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                General Availability
              </label>
              <div className="space-y-4">
                {Object.entries(availability).map(([day, config]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="capitalize">{day}</span>
                    {config.available ? (
                      <div className="flex items-center gap-2">
                        <select className="p-2 border rounded-md">
                          <option>{config.hours[0]}</option>
                        </select>
                        <span>-</span>
                        <select className="p-2 border rounded-md">
                          <option>{config.hours[1]}</option>
                        </select>
                      </div>
                    ) : (
                      <span className="text-gray-500">Unavailable</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <button
              onClick={handleClose}
              className="w-full bg-indigo-700 text-white py-2 rounded-md hover:bg-indigo-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

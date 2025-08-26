import React, { useState } from "react";
import CreateEvent from "./CreateEvent";
import UserAvatarDropdown from "./UserAvatarDropdown";
import { clearLocalStorageCredentials } from "../../../utils/storage";

const CalendarHeader = ({
  darkMode,
  toggleDarkMode,
  selectedDate,
  setSelectedDate,
  view,
  setView,
}) => {
  const today = new Date();
  const isTodaySelected =
    selectedDate.getFullYear() === today.getFullYear() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getDate() === today.getDate();

  // Modal state
  const [showModal, setShowModal] = useState(false);

  const createEvent = () => setShowModal(true);

  // Logout handler
  const handleLogout = () => {
    clearLocalStorageCredentials();
    window.location.href = "/login";
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
  className={`px-3 py-1 rounded transition-colors 
    ${view === "day" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800"}`}
  onClick={() => setView("day")}
>
  Today
</button>
         {/* Toggle Switch */}
<label className="ml-2 flex items-center cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      checked={darkMode}
      onChange={toggleDarkMode}
      className="sr-only"
      aria-label="Toggle dark mode"
    />
    {/* Track */}
    <div
      className={`block w-10 h-6 rounded-full transition-colors ${
        darkMode ? "bg-blue-500" : "bg-gray-300"
      }`}
    ></div>

    {/* Dot */}
    <div
      className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition ${
        darkMode ? "translate-x-4" : ""
      }`}
    ></div>
  </div>
  <span className="ml-2 text-sm">
    {darkMode ? "Dark" : "Light"}
  </span>
</label>

        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded ${view === "day" ? "bg-gray-100 dark:bg-gray-800 font-bold" : ""}`}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 rounded ${view === "list" ? "bg-white border font-bold dark:bg-gray-900 dark:border-gray-700" : ""}`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="cursor-pointer bg-blue-600 text-white rounded-sm w-8 h-8 flex items-center justify-center text-xl"
            onClick={createEvent}
          >
            +
          </button>
          <UserAvatarDropdown onLogout={handleLogout} />
        </div>
      </div>
      <CreateEvent
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default CalendarHeader;
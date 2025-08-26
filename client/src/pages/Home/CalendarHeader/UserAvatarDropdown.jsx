import React, { useState, useRef, useEffect } from "react";

const UserAvatarDropdown = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userName = localStorage.getItem("userName") || "";
  const userEmail = localStorage.getItem("userEmail") || "";
  const firstLetter = userName ? userName[0].toUpperCase() : "?";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="cursor-pointer bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold dark:bg-gray-700 dark:text-gray-200"
        onClick={() => setOpen((v) => !v)}
        title={userName}
      >
        {firstLetter}
      </div>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded z-50 p-3">
          <div className="mb-2">
            <div className="font-semibold text-sm">{userEmail}</div>
            <div className="text-xs text-gray-500">{userName}</div>
          </div>
          <div className="mb-2 border-b border-gray-200 dark:border-gray-700" />
          <div className="mb-2">
            <div className="text-xs font-semibold mb-1">Documentation</div>
            <div className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
              <span role="img" aria-label="calendar">📅</span>
              <div>
                <div className="text-xs font-semibold">Google Calendar</div>
                <div className="text-xs text-gray-500">
                  Connect your Google Calendar to sync events with your tasks
                </div>
              </div>
              <button className="ml-auto px-2 py-1 bg-green-500 text-white text-xs rounded">
                Connect
              </button>
            </div>
          </div>
          <button
            className="w-full mt-2 px-3 py-1 text-left text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm"
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatarDropdown;
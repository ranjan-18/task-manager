import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";

export default function HomeScreen() {
  const [darkMode, setDarkMode] = useState(false);

  // toggle
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Apply dark class to <html> or <body>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="max-w-5xl mx-auto p-4">
        <CalendarHeader
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          selectedDate={new Date()}
          setSelectedDate={() => {}}
          view="day"
          setView={() => {}}
        />
        {/* Your main content here */}
        <div className="mt-6 p-6 rounded-lg shadow bg-white dark:bg-gray-800">
          <h1 className="text-2xl font-bold">Welcome to Calendar</h1>
          <p>This is your home screen content.</p>
        </div>
      </div>
    </div>
  );
}

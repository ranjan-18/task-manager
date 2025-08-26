import React, { useState } from "react";

// Helper to get days for a week starting from Sunday
const getWeekDays = (date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const dayShort = ["S", "M", "T", "W", "T", "F", "S"];

const CalendarBar = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  const weekDays = getWeekDays(selectedDate);

  // For dropdown calendar
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  // Get all days for the current calendar month (for dropdown)
  const getMonthDays = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    // Fill leading blanks
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    // Fill days of month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  };

  const monthDays = getMonthDays(calendarMonth);

  // Utility to compare dates (ignoring time)
  const isSameDay = (d1, d2) =>
    d1 &&
    d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div className="relative flex items-center gap-2 mb-2">
      {/* Calendar Icon */}
      <button
        className="mr-2 text-lg focus:outline-none"
        onClick={() => setShowCalendar((v) => !v)}
        aria-label="Open calendar"
        type="button"
      >
        📅
      </button>
      <span className="font-semibold text-lg mr-2">
        {selectedDate.toLocaleString("default", { month: "long" })}{" "}
        {selectedDate.getFullYear()}
      </span>
      <button
        className="mx-1 text-gray-400"
        onClick={() =>
          setSelectedDate(
            new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate() - 7
            )
          )
        }
        aria-label="Previous week"
        type="button"
      >
        &lt;
      </button>
      <div className="flex gap-2 overflow-x-auto scrollbar-thin">
        {weekDays.map((d, idx) => {
          // Highlight logic
          const isSelected = isSameDay(d, selectedDate);
          const isToday = isSameDay(d, today);
          let classes =
            "flex flex-col items-center px-2 py-1 rounded-lg cursor-pointer transition-colors";
          if (isSelected) {
            classes += " bg-red-500 text-white border-2 border-red-600";
          } else if (isToday) {
            classes += " bg-purple-100 text-purple-700 border-2 border-purple-400";
          } else {
            classes +=
              " bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200";
          }
          return (
            <div
              key={idx}
              className={classes}
              onClick={() => setSelectedDate(new Date(d))}
              role="button"
              tabIndex={0}
            >
              <span className="text-xs">{dayShort[d.getDay()]}</span>
              <span className="font-bold">{d.getDate()}</span>
              <span className="flex gap-1 mt-1">
                <span className="w-1 h-1 rounded-full bg-green-400"></span>
                <span className="w-1 h-1 rounded-full bg-yellow-400"></span>
                <span className="w-1 h-1 rounded-full bg-blue-400"></span>
              </span>
            </div>
          );
        })}
      </div>
      <button
        className="mx-1 text-gray-400"
        onClick={() =>
          setSelectedDate(
            new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              selectedDate.getDate() + 7
            )
          )
        }
        aria-label="Next week"
        type="button"
      >
        &gt;
      </button>

      {/* Dropdown Calendar */}
      {showCalendar && (
        <div className="absolute z-10 left-0 top-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <button
              className="px-2 py-1 text-gray-500"
              onClick={() =>
                setCalendarMonth(
                  new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1)
                )
              }
              aria-label="Previous month"
              type="button"
            >
              &lt;
            </button>
            <span className="font-semibold">
              {calendarMonth.toLocaleString("default", { month: "long" })}{" "}
              {calendarMonth.getFullYear()}
            </span>
            <button
              className="px-2 py-1 text-gray-500"
              onClick={() =>
                setCalendarMonth(
                  new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1)
                )
              }
              aria-label="Next month"
              type="button"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayShort.map((d, i) => (
              <div key={i} className="text-xs font-bold text-center">
                {d}
              </div>
            ))}
            {monthDays.map((d, i) =>
              d ? (
                <button
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                    ${
                      isSameDay(d, selectedDate)
                        ? "bg-red-500 text-white"
                        : isSameDay(d, today)
                        ? "bg-purple-100 text-purple-700 border border-purple-400"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }
                  `}
                  onClick={() => {
                    setSelectedDate(new Date(d));
                    setShowCalendar(false);
                  }}
                  type="button"
                >
                  {d.getDate()}
                </button>
              ) : (
                <div key={i} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarBar;
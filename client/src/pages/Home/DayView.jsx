import React from "react";

const DayView = ({ selectedDate, tasks }) => {
  // Filter tasks for the selected date
  const dateStr = selectedDate.toISOString().split("T")[0];
  const todaysTasks = tasks.filter(
    (task) => task.date && task.date.startsWith(dateStr)
  );

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">
        Tasks for {selectedDate.toLocaleDateString()}
      </h2>
      {todaysTasks.length === 0 ? (
        <div className="text-gray-400">No tasks for this day.</div>
      ) : (
        <ul>
          {todaysTasks.map((task) => (
            <li key={task._id} className="mb-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
              <div className="font-semibold">{task.title}</div>
              <div className="text-xs text-gray-500">{task.startTime} - {task.endTime}</div>
              <div className="text-xs">{task.note}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayView;
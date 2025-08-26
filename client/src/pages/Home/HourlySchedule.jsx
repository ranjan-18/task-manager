import React, { useState } from "react";
import TaskDetailModal from "./TaskDetailModal";
import CreateEvent from "./CalendarHeader/CreateEvent";

const getHour = (timeStr) => {
  // Expects "HH:mm" or "HH:mm:ss"
  if (!timeStr) return null;
  const [hour] = timeStr.split(":");
  return parseInt(hour, 10);
};

const formatReminders = (reminder) => {
  if (!reminder || !reminder.length) return null;
  return reminder.map((r) => `"${r}min"`).join(", ");
};

const HourlySchedule = ({ selectedDate, tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createInitial, setCreateInitial] = useState(null);

  // Filter tasks for the selected date
  const dateStr = selectedDate.toISOString().split("T")[0];
  const todaysTasks = tasks.filter(
    (task) => task.date && task.date.startsWith(dateStr)
  );

  // Group tasks by hour
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Handle double click on hour row
  const handleHourDoubleClick = (hour) => {
    setCreateInitial({
      date: selectedDate,
      startTime: `${hour.toString().padStart(2, "0")}:00`,
      endTime: "",
      title: "",
      company: "",
      type: "task",
      color: "blue",
      note: "",
      assignedTo: "",
      repeat: "none",
      reminder: [],
    });
    setShowCreate(true);
  };

  return (
    <div className="mt-4">
      {hours.map((hour) => (
        <div
          key={hour}
          className="flex items-start border-b border-gray-200 dark:border-gray-700 py-2 hover-bg-gray-400 dark:hover:bg-gray-100"
          onDoubleClick={() => handleHourDoubleClick(hour)}
          style={{ cursor: "pointer" }}
          title="Double click to add event"
        >
          <div className="w-16 text-right pr-4 text-xs text-gray-500">
            {hour.toString().padStart(2, "0")}:00
          </div>
          <div className="flex-1">
            {todaysTasks
              .filter((task) => getHour(task.startTime) === hour)
              .map((task) => (
                <div
                  key={task._id}
                  className="mb-2 px-3 py-2 rounded bg-blue-100 dark:bg-blue-900 text-sm shadow cursor-pointer"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="font-semibold">{task.title}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {task.startTime} - {task.endTime}
                  </div>
                  <div className="text-xs text-gray-500">{task.note}</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {task.repeat && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-semibold">
                        REPEAT: {task.repeat}
                      </span>
                    )}
                    {task.reminder && task.reminder.length > 0 && (
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">
                        REMINDERS: [{formatReminders(task.reminder)}]
                      </span>
                    )}
                    {task.status && (
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        task.status === "Pending"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-300 text-gray-800"
                      }`}>
                        {task.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      <CreateEvent
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        selectedDate={selectedDate}
        initialForm={createInitial}
        isEdit={false}
      />
    </div>
  );
};

export default HourlySchedule;
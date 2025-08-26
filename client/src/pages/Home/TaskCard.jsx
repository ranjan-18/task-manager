import React from "react";

const typeStyles = {
  delegated: "border-l-4 border-purple-400 bg-purple-50 dark:bg-purple-900",
  meeting: "border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900",
  task: "border-l-4 border-orange-400 bg-orange-50 dark:bg-orange-900",
  default: "border-l-4 border-gray-300 bg-gray-50 dark:bg-gray-800",
};

const typeIcons = {
  delegated: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-600">
      <svg width="18" height="18" fill="currentColor">
        <circle cx="9" cy="9" r="8" />
      </svg>
    </span>
  ),
  meeting: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600">
      <svg width="18" height="18" fill="currentColor">
        <rect x="3" y="6" width="12" height="8" rx="2" />
      </svg>
    </span>
  ),
  task: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-600">
      <svg width="18" height="18" fill="currentColor">
        <rect x="4" y="4" width="10" height="10" rx="2" />
      </svg>
    </span>
  ),
  default: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-500">
      <svg width="18" height="18" fill="currentColor">
        <circle cx="9" cy="9" r="8" />
      </svg>
    </span>
  ),
};

const TaskCard = ({ task }) => {
  const type = task.type || "default";
  const status = task.status || "No Action";
  const delegated = task.type === "delegated";
  const pending = task.status === "Pending";

  // Format reminders
  const reminders =
    Array.isArray(task.reminder) && task.reminder.length > 0
      ? task.reminder.map((r) => `"${r}min"`).join(", ")
      : null;

  return (
    <div
      className={`relative rounded shadow p-4 mb-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center ${typeStyles[type]}`}
      style={{ background: delegated ? "#fff8f3" : undefined }}
    >
      {/* Icon/Avatar */}
      <div className="flex-shrink-0">{typeIcons[type] || typeIcons.default}</div>
      {/* Main Content */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-base">{task.title}</span>
          {delegated && (
            <span className="ml-2 px-2 py-0.5 rounded bg-purple-200 text-purple-700 text-xs font-semibold">
              Delegated
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mb-1">{task.note}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-black text-white px-2 py-0.5 rounded text-xs font-mono">
            {task.date}
          </span>
          <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-mono">
            {task.startTime ? task.startTime.padEnd(5, "0") : "--:--"}
          </span>
          {/* End Time */}
          {task.endTime && (
            <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs font-mono">
              END: {task.endTime}
            </span>
          )}
        </div>
        {/* Repeat & Reminders */}
        <div className="flex flex-wrap gap-2 mb-2">
          {task.repeat && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs font-semibold">
              REPEAT: {task.repeat}
            </span>
          )}
          {reminders && (
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">
              REMINDERS: [{reminders}]
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {/* Action Dropdown */}
          <select className="px-2 py-1 bg-gray-700 text-white text-xs rounded">
            <option>No Action</option>
            <option>Complete</option>
            <option>Delete</option>
          </select>
          {/* Status Dropdown */}
          <select
            className={`px-2 py-1 rounded text-xs ${
              pending
                ? "bg-orange-500 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            }`}
            defaultValue={status}
          >
            <option>Pending</option>
            <option>Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
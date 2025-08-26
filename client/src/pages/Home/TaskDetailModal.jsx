import React, { useState } from "react";
import CreateEvent from "./CalendarHeader/CreateEvent";

const typeIcons = {
  delegated: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-600">
      <svg width="18" height="18" fill="currentColor"><circle cx="9" cy="9" r="8"/></svg>
    </span>
  ),
  meeting: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-600">
      <svg width="18" height="18" fill="currentColor"><rect x="3" y="6" width="12" height="8" rx="2"/></svg>
    </span>
  ),
  task: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-100 text-orange-600">
      <svg width="18" height="18" fill="currentColor"><rect x="4" y="4" width="10" height="10" rx="2"/></svg>
    </span>
  ),
  default: (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-500">
      <svg width="18" height="18" fill="currentColor"><circle cx="9" cy="9" r="8"/></svg>
    </span>
  ),
};

const TaskDetailModal = ({ task, onClose, users = [], fetchUsers }) => {
  const [editOpen, setEditOpen] = useState(false);

  if (!task) return null;

  const type = task.type || "default";
  const reminders =
    Array.isArray(task.reminder) && task.reminder.length > 0
      ? task.reminder.map((r) => `"${r}min"`).join(", ")
      : null;

  // Prepare initial values for edit form
  const initialForm = {
    ...task,
    date: task.date ? new Date(task.date) : new Date(),
    assignedTo: task.assignedTo?._id || task.assignedTo || "",
    reminder: Array.isArray(task.reminder)
      ? task.reminder.map(String)
      : [],
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Edit Button */}
          <button
            className="absolute top-3 right-16 flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-xs rounded text-white border border-gray-700"
            onClick={() => setEditOpen(true)}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M12.3 2.3a1 1 0 0 1 1.4 1.4l-8.6 8.6-2 0.6 0.6-2 8.6-8.6z"/></svg>
            Edit
          </button>
          <button
            className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-200"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex items-center gap-2 mb-2">
            {typeIcons[type]}
            <span className="font-bold text-lg">{task.title}</span>
          </div>
          <div className="text-sm text-gray-400 mb-2">
            Company/Description
          </div>
          <div className="mb-2">{task.company || ""}</div>
          <div className="flex items-center gap-3 mb-2 text-sm">
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="currentColor" className="inline"><rect x="2" y="2" width="12" height="12" rx="2"/></svg>
              {task.date}
            </span>
            <span className="flex items-center gap-1">
              <svg width="16" height="16" fill="currentColor" className="inline"><circle cx="8" cy="8" r="7"/></svg>
              {task.endTime}
            </span>
          </div>
          <div className="flex gap-2 mb-2">
            <span className="bg-blue-700 text-white px-2 py-0.5 rounded text-xs">{(task.type || "TASK").toUpperCase()}</span>
            <span className="bg-gray-700 text-white px-2 py-0.5 rounded text-xs">{task.status || "No Action"}</span>
          </div>
          <div className="mb-2">
            <div className="text-xs text-gray-400 mb-1">Notes</div>
            <div className="bg-gray-800 rounded p-2 text-xs whitespace-pre-line">
              {task.note}
              {task.repeat && <> REPEAT:{task.repeat}</>}
              {reminders && <> REMINDERS:[{reminders}]</>}
              {task.endTime && <> ENDTIME:{task.endTime}</>}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Created by: {task.assignedTo?.email || ""}
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {editOpen && (
        <CreateEvent
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          selectedDate={initialForm.date}
          users={users}
          fetchUsers={fetchUsers}
          initialForm={initialForm}
          isEdit={true}
        />
      )}
    </>
  );
};

export default TaskDetailModal;
import React, { useState, useEffect } from "react";
import axios from "axios";
import eventsApi from "../../../apis/events";
import showToastr from "../../../utils/showToastr";

const EVENT_TYPES = [
  { value: "task", label: "Task" },
  { value: "meeting", label: "Meeting" },
  { value: "reminder", label: "Reminder" },
];

const COLORS = [
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "yellow", label: "Yellow", className: "bg-yellow-400" },
  { value: "green", label: "Green", className: "bg-green-400" },
  { value: "red", label: "Red", className: "bg-red-400" },
];

const REPEAT_OPTIONS = [
  { value: "none", label: "Does not repeat" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const REMINDERS = [
  { value: 5, label: "5 minutes before" },
  { value: 15, label: "15 minutes before" },
  { value: 30, label: "30 minutes before" },
  { value: 60, label: "1 hour before" },
  { value: 1440, label: "1 day before" },
];

const CreateEvent = ({
  isOpen,
  onClose,
  selectedDate,
  initialForm = null,
  isEdit = false,
}) => {
  const [form, setForm] = useState(
    initialForm || {
      date: selectedDate,
      startTime: "",
      endTime: "",
      title: "",
      company: "",
      type: "task",
      color: "blue",
      note: "",
      assignedTo: "",
      repeat: "none",
      reminder: [],
    }
  );

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (initialForm) setForm(initialForm);
    else setForm((f) => ({ ...f, date: selectedDate }));
  }, [selectedDate, isOpen, initialForm]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get("/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((res) => setUsers(res.data))
        .catch(() => setUsers([]));
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "reminder") {
      setForm((f) =>
        checked
          ? { ...f, reminder: [...f.reminder, value] }
          : { ...f, reminder: f.reminder.filter((r) => r !== value) }
      );
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit && initialForm && initialForm._id) {
        await eventsApi.update({
          id: initialForm._id,
          payload: {
            ...form,
            weekOf: getWeekOf(form.date),
          },
        });
        showToastr({ message: "Event updated successfully!" });
      } else {
        await eventsApi.create({
          ...form,
          weekOf: getWeekOf(form.date),
        });
        showToastr({ message: "Event created successfully!" });
      }
      onClose();
    } catch (error) {
      showToastr({
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to save event",
        type: "error",
      });
    }
  };

  function getWeekOf(date) {
    // Returns the Sunday of the week for the given date
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d.toISOString().split("T")[0];
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto relative rounded"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="mb-2">
            <div className="font-semibold text-base">
              {isEdit ? "Edit Event" : "Create New Event"}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {form.date
                ? `${form.date.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}${
                    form.startTime ? `, Start: ${form.startTime}` : ""
                  }`
                : ""}
            </div>
          </div>
          {/* Date */}
          <div>
            <label className="block text-xs mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date ? new Date(form.date).toISOString().split("T")[0] : ""}
              onChange={(e) => setForm((f) => ({ ...f, date: new Date(e.target.value) }))}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          {/* Start Time */}
          <div>
            <label className="block text-xs mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          {/* Title */}
          <div>
            <label className="block text-xs mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          {/* Company */}
          <div>
            <label className="block text-xs mb-1">Company (Optional)</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
          {/* Type */}
          <div>
            <label className="block text-xs mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          {/* Color */}
          <div>
            <label className="block text-xs mb-1">Color</label>
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
            >
              {COLORS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          {/* Note */}
          <div>
            <label className="block text-xs mb-1">Note (Optional)</label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Enter additional notes"
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
              rows={2}
            />
          </div>
          {/* Assign To */}
          <div>
            <label className="block text-xs mb-1">Assign to One Person</label>
            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
              required
            >
              <option value="">Select a registered user</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>
          {/* End Time */}
          <div>
            <label className="block text-xs mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>
          {/* Repeat */}
          <div>
            <label className="block text-xs mb-1">Repeat</label>
            <select
              name="repeat"
              value={form.repeat}
              onChange={handleChange}
              className="w-full rounded px-2 py-1 border dark:bg-gray-800 dark:border-gray-700"
            >
              {REPEAT_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {/* Reminders */}
          <div>
            <label className="block text-xs mb-1">Reminders</label>
            <div className="flex flex-col gap-1">
              {REMINDERS.map((r) => (
                <label key={r.value} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    name="reminder"
                    value={r.value}
                    checked={form.reminder.includes(String(r.value))}
                    onChange={handleChange}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </div>
          {/* Color Dots */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs">Color:</span>
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center focus:outline-none ${
                  form.color === c.value
                    ? `${c.className} border-black dark:border-white`
                    : `${c.className} border-transparent opacity-60`
                }`}
                onClick={() => setForm((f) => ({ ...f, color: c.value }))}
                aria-label={c.label}
              />
            ))}
          </div>
          {/* Actions */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 rounded bg-blue-600 text-white font-semibold"
            >
              {isEdit ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
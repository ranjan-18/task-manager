import React from "react";
import TaskCard from "./TaskCard";

// Helper to group tasks by month and date
function groupTasks(tasks) {
  const grouped = {};
  tasks.forEach((task) => {
    const date = new Date(task.date);
    const monthKey = date.toLocaleString("default", { month: "long", year: "numeric" });
    const dateKey = date.toISOString().split("T")[0];
    if (!grouped[monthKey]) grouped[monthKey] = {};
    if (!grouped[monthKey][dateKey]) grouped[monthKey][dateKey] = [];
    grouped[monthKey][dateKey].push(task);
  });
  return grouped;
}

const monthBannerImages = [
  // Add your banner image URLs here, or use a default
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
];

const TaskListView = ({ tasks }) => {
  const grouped = groupTasks(tasks);
  let bannerIdx = 0;

  return (
    <div className="px-2">
      {Object.entries(grouped).map(([month, dates]) => (
        <div key={month} className="mb-8">
          {/* Month Banner */}
          <div className="relative rounded-lg overflow-hidden mb-4 h-24 flex items-end">
            <img
              src={monthBannerImages[bannerIdx++ % monthBannerImages.length]}
              alt={month}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              draggable={false}
            />
            <div className="relative z-10 p-4 text-white font-bold text-lg drop-shadow">
              <div>{month}</div>
              <div className="text-xs font-normal">
                {Object.keys(dates)[0] &&
                  new Date(Object.keys(dates)[0]).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
              </div>
            </div>
          </div>
          {/* Dates and Tasks */}
          {Object.entries(dates).map(([date, tasksOnDate]) => (
            <div key={date} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-semibold">
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <span className="text-xs text-gray-400">
                  {tasksOnDate.length} task{tasksOnDate.length > 1 ? "s" : ""}
                </span>
              </div>
              {tasksOnDate.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskListView;
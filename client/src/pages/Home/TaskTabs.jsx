import React from "react";

const TaskTabs = ({ tasks = [], userEmail }) => {
  // Count tasks created by me
  const myTasksCount = tasks.filter(
    (task) => task.createdBy === userEmail
  ).length;

  // Count tasks delegated to me
  const delegatedTasksCount = tasks.filter(
    (task) => task.assignedTo === userEmail && task.createdBy !== userEmail
  ).length;

  // Count meeting type tasks
  const meetingsCount = tasks.filter(
    (task) => task.type === "meeting"
  ).length;

  return (
    <div className="flex gap-4 mb-4">
      <button className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold dark:bg-blue-900 dark:text-blue-200">
        My Tasks <span className="ml-1">{myTasksCount}</span>
      </button>
      <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full dark:bg-gray-800 dark:text-gray-200">
        Delegated Task <span className="ml-1">{delegatedTasksCount}</span>
      </button>
      <button className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full dark:bg-gray-800 dark:text-gray-200">
        Meetings <span className="ml-1">{meetingsCount}</span>
      </button>
    </div>
  );
};

export default TaskTabs;

import React, { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import TaskTabs from "./TaskTabs";
import CalendarBar from "./CalendarBar";
import DayScheduleHeader from "./DayScheduleHeader";
import HourlySchedule from "./HourlySchedule";
import TaskListView from "./TaskListView";
import eventsApi from "../../apis/events"; // Make sure this path is correct

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [view, setView] = useState("day"); // "day" or "list"
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const res = await eventsApi.fetch();
        // Filter events where event.email matches userEmail
        const userTasks = res.data.filter((event) => event.assignedTo.email === userEmail);
        setTasks(userTasks);
      } catch (err) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white min-h-screen dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <CalendarHeader
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        view={view}
        setView={setView}
      />
      <TaskTabs selectedDate={selectedDate} />
      {view === "day" ? (
        <>
          <CalendarBar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <DayScheduleHeader selectedDate={selectedDate} />
          <HourlySchedule selectedDate={selectedDate} tasks={tasks} /> {/* Pass tasks here */}
        </>
      ) : (
        <TaskListView tasks={tasks} />
      )}
    </div>
  );
};

export default Home;
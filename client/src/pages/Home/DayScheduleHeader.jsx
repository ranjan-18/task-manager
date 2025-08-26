import React from "react";

const DayScheduleHeader = ({ selectedDate }) => (
  <div className="mt-6 mb-2">
    <div className="font-semibold text-lg mb-1">
      Day Schedule - {selectedDate.toLocaleString("default", { month: "long" })} {selectedDate.getDate()}, {selectedDate.getFullYear()}
    </div>
    <div className="flex items-center justify-between border-b pb-1 dark:border-gray-700">
      <span className="font-semibold">Hourly Schedule</span>
      <span className="text-gray-500 text-sm">0 scheduled</span>
    </div>
  </div>
);

export default DayScheduleHeader;
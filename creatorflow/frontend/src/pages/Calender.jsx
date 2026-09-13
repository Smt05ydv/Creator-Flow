import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isToday,
  isSameDay,
} from "date-fns";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

const Calendar = () => {

  // Current month being displayed
  const [currentDate, setCurrentDate] = useState(new Date());

  // Static events for now
  // Later these will come from MongoDB
  const [events] = useState([
    {
      id: 1,
      title: "Nike Promotion",
      date: new Date(2026, 8, 5),
      amount: "₹30,000",
    },
    {
      id: 2,
      title: "Boat Promotion",
      date: new Date(2026, 8, 10),
      amount: "₹45,000",
    },
  ]);


  // Go to previous month
  const previousMonth = () => {
    setCurrentDate(
      subMonths(currentDate, 1)
    );
  };


  // Go to next month
  const nextMonth = () => {
    setCurrentDate(
      addMonths(currentDate, 1)
    );
  };


  // Go back to current month
  const goToToday = () => {
    setCurrentDate(new Date());
  };


  // First and last day of current month
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);


  // Get every day of current month
  const days = eachDayOfInterval({
    start,
    end,
  });


  // Find which day of the week the month starts on
  const startingDay = getDay(start);


  // Get events for a particular date
  const getEventsForDay = (day) => {
    return events.filter((event) =>
      isSameDay(event.date, day)
    );
  };


  return (
    <div className="min-h-screen bg-white px-8 py-8">

      {/* Page Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-medium">
            Calendar
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your promotion deadlines and events
          </p>
        </div>


        {/* Today Button */}
        <button
          onClick={goToToday}
          className="
            flex items-center gap-2
            px-4 py-2.5
            rounded-lg
            border border-gray-200
            hover:bg-gray-100
            transition
          "
        >
          <CalendarDays className="w-5 h-5" />
          Today
        </button>

      </div>


      {/* Calendar Box */}
      <div className="
        mt-8
        max-w-5xl
        rounded-2xl
        border border-gray-200
        bg-white
        shadow-sm
        overflow-hidden
      ">


        {/* Month Navigation */}
        <div className="
          flex items-center justify-between
          p-5
          border-b border-gray-200
        ">

          <button
            onClick={previousMonth}
            className="
              flex items-center justify-center
              w-9 h-9
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>


          <h2 className="text-xl font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h2>


          <button
            onClick={nextMonth}
            className="
              flex items-center justify-center
              w-9 h-9
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>


        {/* Week Names */}
        <div className="grid grid-cols-7 border-b border-gray-200">

          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (

            <div
              key={day}
              className="
                p-4
                text-center
                text-sm
                font-medium
                text-gray-500
                border-r border-gray-200
              "
            >
              {day}
            </div>

          ))}

        </div>


        {/* Calendar Dates */}
        <div className="grid grid-cols-7">

          {/* Empty boxes before first date */}
          {Array.from({
            length: startingDay,
          }).map((_, index) => (

            <div
              key={`empty-${index}`}
              className="
                min-h-28
                border-r
                border-b
                border-gray-200
              "
            />

          ))}


          {/* Actual dates */}
          {days.map((day) => {

            const dayEvents = getEventsForDay(day);

            return (

              <div
                key={day.toString()}
                className="
                  min-h-28
                  border-r
                  border-b
                  border-gray-200
                  p-3
                  hover:bg-gray-50
                  transition
                "
              >

                {/* Date Number */}
                <div className="flex justify-end">

                  <span
                    className={`
                      flex items-center justify-center
                      w-7 h-7
                      rounded-full
                      text-sm
                      ${
                        isToday(day)
                          ? "bg-blue-500 text-white font-semibold"
                          : "text-gray-700"
                      }
                    `}
                  >
                    {format(day, "d")}
                  </span>

                </div>


                {/* Events */}
                <div className="mt-2 space-y-1">

                  {dayEvents.map((event) => (

                    <div
                      key={event.id}
                      className="
                        rounded-md
                        bg-blue-50
                        px-2
                        py-1.5
                        text-xs
                        text-blue-600
                        font-medium
                      "
                    >

                      <p>
                        {event.title}
                      </p>

                      <p className="text-blue-500">
                        {event.amount}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
};

export default Calendar;
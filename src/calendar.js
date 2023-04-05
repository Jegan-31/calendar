import React, { useState } from "react";
import { Calendar } from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleAddEvent = () => {
    const title = window.prompt("Enter event title:");
    if (title) {
      const startTime = window.prompt("Enter start time (HH:mm):");
      const endTime = window.prompt("Enter end time (HH:mm):");

      const newEvent = {
        date: moment(date).format("YYYY-MM-DD"),
        title,
        startTime,
        endTime,
      };
      setEvents([...events, newEvent]);
    }
  };
var id =1;
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventsForDate = events.filter((event) =>
        moment(event.date).isSame(date, "day")
      );
      return (
        <div className="tile-content">
          {eventsForDate.map((event) => (
            <div className="event-badge" key={event.date + event.title}>
              {event.title}
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const eventList = events
    .filter((event) => moment(event.date).isSame(date, "month"))
    .map((event) => (
      <div className="event-item" key={event.date + event.title}>
        <h4>{event.title}</h4>
        <p>
          {moment(event.date).format("MMMM Do, YYYY")} ({event.startTime} -{" "}
          {event.endTime})
        </p>
      </div>
    ));
   const clickFn=()=>{
      setEvents([])
    }

  return (
    <div>
      <div className="calendar-container">
        <div className="calendar-header">
          <h2>CALENDAR</h2>
          <button onClick={handleAddEvent}>Add Event</button>
        </div>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent}
        />
      </div>
      <div className="event-list-container">
        {eventList.length ? (
          <div className="event-list">{eventList}</div>
        ) : (
          <p>No events for this month.</p>
        )}
      </div>
      <button onClick={clickFn()}></button>
    </div>
  );

 
function MyForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.value;

    // if (isValid(value)) {
    //   toast.success('Value entered successfully!');
    // } else {
    //   toast.error('Invalid value entered.');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
      {/* <ToastContainer /> */}
    </form>
  );
}

};

export default MyCalendar;

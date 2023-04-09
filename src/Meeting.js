import React, { useState } from "react";
import { Calendar } from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Meeting.css";
import Marquee from "react-fast-marquee";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Meeting = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [handlevent, setHandleEvent] = useState(false)
  const meetObject = {
    meeting: "",
    start: "",
    end: ""
  };
  const [meet, setMeet] = useState(meetObject);
  const handleDateChange = (newDate) => {
    console.log(newDate+"=====");
     setDate(newDate) };
  const handleAddEvent = () => { setHandleEvent(true) };
  console.log(handlevent)
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventsForDate = events.filter((event) => moment(event.date).isSame(date, "day"));
      return (
        <div className="tile-content">
          {eventsForDate.map((event) => (
            <div className="event-badge" key={event.date + event.title}>
              {event.title}
            </div>
          ))
          }
        </div>
      );
    } else { return null; }
  };
  const eventList = events
    .filter((event) => moment(event.date).isSame(date, "month"))
    .map((event) => (
      <div className="event-item" key={event.date + event.title}>
        <h4>{event.title}</h4>
        <p>
          {moment(event.date).format("MMMM Do, YYYY")} ({event.meet.start} - {" "} - {event.meet.end})
        </p>
      </div>
    ));
  console.log(meet);
  const getEventvalue = (e) => {
    setMeet((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }
  console.log(events)
  const value = () => {
    const newEvent = {
      title: meet.meeting,
      meet: { ...meet },
      date: date
    };
    setEvents([...events, newEvent]);
    setMeet(meetObject)
  }
  return (
    <div>
      <div className="calendar-container">
        <div className="calendar-header">
          <h2> My Meetings </h2>
          <button onClick={handleAddEvent}>Schedule a Meeting</button>
        </div>
        <Calendar onChange={handleDateChange}
        value={date}
          tileContent={tileContent} />
      </div>
      <div className="event-list-container">
        {eventList.length ? (<div className="event-list">{eventList}</div>) :
          (
            <p> <Marquee> No Meetings scheduled.</Marquee></p>
          )
        }
      </div>
      <Modal show={handlevent}>
        <Modal.Dialog>
          <Modal.Header >
            <Modal.Title>Meeting name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" name="meeting" onChange={(event) => getEventvalue(event)} value={meet.meeting} ></input>
            <input type="time" name="start" onChange={(event) => getEventvalue(event)} value={meet.start}></input>
            <input type="time" name="end" onChange={(event) => getEventvalue(event)} value={meet.end}></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary" onClick={value}>Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
};
export default Meeting;
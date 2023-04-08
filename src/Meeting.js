import React,{useState} from "react";
import {Calendar} from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Meeting.css";
import Marquee from "react-fast-marquee";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Meeting = () => {const [date, setDate] = useState(new Date());
const [events, setEvents] = useState([]);
const [handlevent, setHandleEvent] = useState(false)
const [val, setVal] = useState('')
const [start,setStarttime]=useState('')
const [end,setEndtime]=useState('')
const handleDateChange = (newDate) => {setDate(newDate);};
const handleAddEvent = () => {setHandleEvent(true)};
console.log(handlevent)
const tileContent = ({ date, view}) =>
   {
    if (view === "month") {
      const eventsForDate = events.filter((event) => moment(event.date).isSame(date,"day"));
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
    .filter((event) => moment(event.date).isSame(date,"month"))
    .map((event) => (
      <div className="event-item" key={event.date + event.title}>
        <h4>{event.title}</h4>
        <p>
          {moment(event.date).format("MMMM Do, YYYY")} ({event.startTime} - { " " } - {event.endTime})
        </p>
      </div>
    ));
  console.log(val);
  const getEventvalue = (e) => {
    setVal(e.target.value)
  }
  const getst=(i)=>{
    setVal(i.target.value)
  }
  const getet=(j)=>{
    setVal(j.target.value)
  }
  const value = () => {
    const newEvent = { title: val };
    setEvents([...events, newEvent ]);
    setVal('')
    setStarttime('')
    setEndtime('')
    console.log(events)
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
        {eventList.length ? ( <div className="event-list">{eventList}</div> ) :
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
            <input type="text" onChange={(event)=>getEventvalue(event)} value={val} ></input>
            <input type="time" onChange={(event)=>getst(event)} value={start}></input>
            <input type="time" onChange={(event)=>getet(event)} value={end}></input>
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
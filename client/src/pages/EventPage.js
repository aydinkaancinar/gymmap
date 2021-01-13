import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import ENV from "./../config.js";
const API_HOST = ENV.api_host;

const EventPage = () => {
  const history = useHistory();
  
  const [event, setEvent] = useState({"attendants": [], "_id": 0});
  const eventId = window.location.pathname.substring(
    7,
    window.location.pathname.length
  );

  useEffect(() => {
    if (event._id == 0) {
      getEvent();
      console.log(event);
    }
  });

  const context = useContext(AuthContext);
  const user = context.state.user;
  
  const getEvent = async () => {
    const newEvent = await fetch(`${API_HOST}/api/events/${eventId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });

    setEvent(newEvent);
  };

  const handleJoinLeave = () => {
    fetch(`${API_HOST}/api/events/${eventId}/${user._id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
      history.push('/events');
  };


  return (
    <div className="border">
      <div className="text">
        <div className="button-padding">
          <button className="button" onClick={history.goBack}>
            Back
          </button>
        </div>
        <div className="event">
          <div className="event-info">
            <h1>{event.name}</h1>
            <h3>{event.time}</h3>
            <h3>{event.place}</h3>
            <h3>
              {event.attending} /{event.capacity}{" "}
            </h3>
          </div>
          <div className="event-picture">
            <img src={event.img} className="event-picture" alt="pic" />
          </div>
        </div>
        <div className="button-padding">
          {!event.attendants.includes(user._id) &&
            event.attending < event.capacity &&
            user.role !== "admin" && (
              <button id="button" className="SignUpButton" onClick={handleJoinLeave}>
                {" "}
                Join!{" "}
              </button>
            )}
          {event.attendants.includes(user._id) && user.role !== "admin" && (
            <button id="button" className="SignUpButton" onClick={handleJoinLeave}>
              {" "}
              Leave Event{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;

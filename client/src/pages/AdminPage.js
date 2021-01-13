import React, { useState, useEffect } from "react";
import "../styles/Activities.css";
import "../styles/Admin.css";
import ENV from "./../config.js";
const API_HOST = ENV.api_host;

const deleteItem = (path, id) => {
  fetch(`${API_HOST}/api/${path}/${id}`, {method: "DELETE"})
  .catch((err) => console.log(err));
};

const Activity = (props) => (
  <div className="Activity">
    <h3 className="ActivityBg"> Activity </h3>

    <button className="deleteBTN" onClick={() => deleteItem("activities", props.activities._id)}>
      <div id="crossbg">
        <div class="leftcross">
          <div class="rightcross"></div>
        </div>
      </div>
    </button>
    <div class="ActivityContent">
      <h4>{props.activities.detail} </h4>
      <img class="ActivityPicture" alt="" src={props.activities.img} />
    </div>
  </div>
);

const Event = (props) => (
  <div className="Activity">
    <h3 className="EventBg"> Event </h3>
    <button className="deleteBTN" onClick={() => deleteItem("events", props.events._id)}>
      <div id="crossbg">
        <div class="leftcross">
          <div class="rightcross"></div>
        </div>
      </div>
    </button>
    <div class="ActivityContent">
      <h4>{props.events.name} </h4>{" "}
      <h5>
        {props.events.time +
          " at " +
          props.events.place +
          " exerting in " +
          props.events.category +
          " being attended by " +
          props.events.attending +
          "/" +
          props.events.capacity}{" "}
      </h5>
      <img class="ActivityPicture" alt="" src={props.events.img} />
    </div>
  </div>
);

const AdminPage = () => {
  const [events, setEvents] = useState([]);
  const [activities, setActivity] = useState([]);

  useEffect(() => {
    if (events.length == 0) {
      getEvents();
    }
    if (activities.length == 0) {
      getActivities();
    }
  }, []);

  const getEvents = async () => {
    const newEvents = await fetch(`${API_HOST}/api/events/`, { method: "GET" })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    setEvents(newEvents);
  };

  const getActivities = async () => {
    const newActivities = await fetch(`${API_HOST}/api/activities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });
    setActivity(newActivities);
  };

  return (
    <div className="border">
      <div className="text">
        <div className="page-title">Admin Controls</div>

        {activities.map((currentevent) => {
          return <Activity activities={currentevent} key={currentevent._id} />;
        })}

        {events.map((currentevent) => {
          return <Event events={currentevent} key={currentevent._id} />;
        })}
      </div>
    </div>
  );
};

export default AdminPage;

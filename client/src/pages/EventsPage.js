import React, { useState , useContext, useEffect }  from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from "../App";
import Event from '../components/Event.js';
import ENV from './../config.js'
const API_HOST = ENV.api_host

const EventsPage = () => {
  const context = useContext(AuthContext);
  const [events, setEvents] = useState([])
  const user = context.state.user;

  useEffect(() => {
    if(events.length == 0) {
      getEvents()
    };
  }, [])

  const getEvents = async () => {
    const newEvents =  await fetch(`${API_HOST}/api/events/`,{method: 'GET'})
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
    setEvents(newEvents)
  }
  
  events.sort((a,b)=>(a.attendants.includes(user.username) < b.attendants.includes(user.username)) ? 1 : ((b.attendants.includes(user.username) < a.attendants.includes(user.username)) ? -1 : 0))
  
  //This will need a server call to generate a list of events that 
  //is currently hardcoded in eventsData.js

  return (
      <div className = "border">
        <div className = "text">
        <div >
        <div style={{display: "flex"}}>
        <div className = "page-title">
          Events List
            </div>
          <div className="to-the-right">
          <div className = "to-the-right"><Link className="button"to={"/createevent"}>Add an Event</Link></div>
            </div>
            </div>
        

          

        </div>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th> <h2>Event </h2> </th>
                            <th> <h2>Time </h2></th>
                            <th> <h2>Place</h2> </th>
                            <th> <h2>Category</h2> </th>
                            <th> <h2># of People</h2> </th>
                            <th> <h2>Actions</h2> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(currentevent => {
                            return <Event events={currentevent} key={currentevent._id}/>;
                            })}
                    </tbody>
                </table>
        </div>
    </div>
  );
}

export default EventsPage;

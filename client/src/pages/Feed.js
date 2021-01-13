import React, { useState , useEffect } from 'react';
import Activity from '../components/Activity';
import FeedEvent from '../components/FeedEvents';
import ENV from './../config.js'
const API_HOST = ENV.api_host

const Feed = () => {
  const [events, setEvents] = useState([]);
  const [activities, setActivity] = useState([]);

  useEffect(() => {
    if(events.length == 0) {
      getEvents()
    }
    if(activities.length == 0) {
      getActivities()
    }
  }, [])

  const getEvents = async () => {
    const newEvents =  await fetch(`${API_HOST}/api/events/`,{method: 'GET'})
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
    setEvents(newEvents)
  }

  const getActivities = async () => {
    const newActivities =  await fetch(`${API_HOST}/api/activities`,{method: 'GET'})
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
    setActivity(newActivities)
  }

  //This will need a server call to get the event and Activities
  return (
    <div className = "border">  
            <div className="page-title">Feed</div>
    
        {activities.map(currentevent => {
                        return <Activity activities={currentevent} key={currentevent._id}/>;
                        })}
        <table><tbody>
            {events.map(currentevent => {
                        return <FeedEvent events={currentevent} key={currentevent._id}/>;
                        })}
        </tbody></table>
    </div>
  );
}

export default Feed;

import React, { useState } from 'react';
import '../styles/Search.css';
import activities from '../data/activitiesData.js';
import events from '../data/eventsData.js';
import { Link } from 'react-router-dom';

const Search = () => {
  const [EventResults, setEventResults] = useState([]);
  const [ActivityResults, setActivityResults] = useState([]);

  const handleSearch = e => {
    //This function will need an api call to get a list of event
    //and activities to search through
    
    const target = e.target.value;
    const filteredEvents= events.filter(event => {
      return event.name.toLowerCase().includes(target.toLowerCase())
    })
    setEventResults(filteredEvents)
    const filteredActivities = activities.filter(activity => {
      return activity.detail.toLowerCase().includes(target.toLowerCase())
    })
    setActivityResults(filteredActivities)
    if(target === ""){
      setActivityResults([]);
      setEventResults([]);
    }
  }

  return (<div>
      <input type="text"
       className="input" 
       placeholder="     Search" 
       onChange={handleSearch}/>
       {EventResults.map(event => {
         return <Link 
         className="search-result"
         to={"/event/"+event._id}>{event.name}</Link>
       })}
       {ActivityResults.map(activity => {
         return <Link 
         className="search-result" 
         to="/activities">{activity.name}</Link>
       })}
       </div>
  );
}

export default Search;

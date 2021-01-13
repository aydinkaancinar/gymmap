import React, { useState , useEffect } from 'react';
import '../styles/Activities.css';
import '../styles/index.css'
import {Link} from 'react-router-dom';
import Activity from '../components/Activity.js';

import ENV from './../config.js'
const API_HOST = ENV.api_host


const ActivitiesPage = () => {
  const [acitivites, setActivity] = useState([]);

  useEffect(() => {
    if(acitivites.length == 0) {
      getActivities()
    };
  }, [])

  const getActivities = async () => {
    const newActivies =  await fetch(`${API_HOST}/api/activities`,{method: 'GET'})
    .then(res => res.json())
    .catch(error => {
        console.log(error);
    });
    setActivity(newActivies)
  }

  return (
    <div className="border">
      <div className="text">
      <div >
        <div className="page-title">My Activities</div>
          <div className = "">
            <Link className="button"to={"/newactivity"}>Log New Activity
            </Link></div>
            </div>
            {acitivites.map(activity => {
                            return <Activity activities={activity} 
                            key={activity._id}/>;
                            })}
        </div>
    </div>
  );
}

export default ActivitiesPage;

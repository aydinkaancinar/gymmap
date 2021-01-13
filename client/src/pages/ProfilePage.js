import React, { useState, useContext}  from 'react';
import Select from 'react-select';
import profile from '../data/profileData.js';
import activitieCategories from '../data/allActivityCategoriesData';
import { AuthContext } from "../App";
import ENV from './../config.js'
const API_HOST = ENV.api_host


const ProfilePage = () => {
    const [profilePicture, setProfilePicutre] = useState("")
    const [userActivities, setActivities] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const context = useContext(AuthContext);
    const user = context.state.user;
    console.log(user)

    const userActivitiesChange = (option) => {
        setActivities(userActivities => {
            return {
              multiValue: option
            };
          });
        user.activities = option
        console.log(user);
    }

    const weightChange = e => {
        setWeight(e.target.value);
        user.weight = e.target.value
        console.log(user);
    }

    const heightChange = e => {
        setHeight(e.target.value);
        user.height = e.target.value
        console.log(profile[0]);
    }

    const ageChange = e => {
        setAge(e.target.value);
        user.age = e.target.value
        console.log(user);
    }

    const profilePicChange = e => {
        setProfilePicutre(e.target.value)
        user.profilePicture = e.target.value
        console.log(user);
    }

    const save = e => {
        const body = JSON.stringify({
            "weight": weight,
            "age": age,
            "height": height,
            "activities": user.activities,
            "profilePicture": profilePicture,
        })
        fetch(`${API_HOST}/api/users/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : body
        })
        .catch(err => {
            console.log(err)
        })
    }


  return (
    <div className = "border">
        <div className = "text">
            <div className = "page-title">
                My Profile
            </div>
            <div className = "page-items">
                Age: 
            </div>
            <input className ="input-box-style" type="text" placeholder={user.age} onChange={ageChange}  />
            <div className = "page-items">
                Height: 
            </div>
            <input className ="input-box-style" type="text" placeholder={user.height} onChange={heightChange}/>
            <div className = "page-items">
                Weight: 
            </div>
            <input className ="input-box-style" type="text" placeholder={user.weight} onChange={weightChange}/>
            <div className = "page-items">
                Activities: 
                <Select className="select-style basic-multi-select"
                defaultValue={user.activities}
                        isMulti
                        name="colors"
                        options={activitieCategories}
                        classNamePrefix="select"
                        onChange={userActivitiesChange}
                />
            </div>
            <div className = "page-items">
                Profile Photo URL: 
            </div>
            <input className ="input-box-style" type="text" placeholder={user.profilePicture} onChange={profilePicChange}  />
            <div className="center">
              <button className="SignUpButton" onClick={save}>  Save </button>
              </div>
        </div>
    </div>
  );
}

export default ProfilePage;

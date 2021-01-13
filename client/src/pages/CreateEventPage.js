import React, { useState }  from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import ImageUploader from 'react-images-upload';
import "react-datepicker/dist/react-datepicker.css"

import events from '../data/eventsData.js';
import categories from '../data/allActivityCategoriesData.js'
import { useHistory, Link} from "react-router-dom";
import { AuthContext } from "../App";
import ENV from './../config.js'
const API_HOST = ENV.api_host

const onDrop = (p) => {
}

const CreateEventPage = () => {
  let history = useHistory();
  const [name, setName] = useState("");
    const [time, setTime] = useState(new Date());
    const [place, setPlace] = useState("");
    const [category, setCategory] = useState("");
    const [eventPic, setEventPic] = useState("");
    const [capacity, setCapacity] = useState("");
    const [displayInvalidPrompt, setdisplayInvalidPrompt] = useState(false);
    const { dispatch } = React.useContext(AuthContext);

    const nameChange = e => {
      setName(e.target.value);
      console.log(name);
  }

    const timeChange = (value, e) => {
      setTime(value);
      console.log(time);
    }

    const placeChange = e => {
        setPlace(e.target.value);
        console.log(place);
    }

    const categoryChange = option => {
      setCategory(option.value);
      console.log(option.value);
  }

    const capacityChange = e => {
      setCapacity(e.target.value);
      console.log(capacity);
  }

  const eventPicChange = e => {
    setEventPic(e.target.value);
    console.log(eventPic);
}

  const isValidEvent = () => {
    if(name === ""){
      console.log("Enter name")
      return false;
    }
    if(time === ""){
      console.log("Enter date")
      return false;
    }
    if(place === ""){
      console.log("Enter location")
      return false;
    }
    if(category === ""){
      console.log("Enter category")
      return false;
    }
    if(capacity === ""){
      console.log("Enter capacity")
      return false;
    }
    if(!Number.isInteger(parseInt(capacity))){
      console.log("Enter capacity")
      return false;
    }
    return true;
}

const addEvent = () => {
  //This will need to become a server call to create events
  events.push({ 
    name: name, 
    time: time.toUTCString(), 
    place: place, 
    category: category, 
    capacity: parseInt(capacity) , 
    attending: 0, 
    img: eventPic,
    attendants: []
  })
}


  const handleEvent = () => {
    if(isValidEvent()){
      const body = { 
        name: name, 
    time: time.toUTCString(), 
    place: place, 
    category: category, 
    capacity: parseInt(capacity) , 
    attending: 0, 
    img: eventPic,
    attendants: []
      }
        

    fetch(`${API_HOST}/api/events/`, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
  })
  .then(res => {
      if(res.status == 400){
          setdisplayInvalidPrompt(true);
      }
      else{
        history.goBack()
      } 
  })
  .catch(err => {
      console.log(err)
  })
}
}
      
  return (
    <div className = "border">
        <div className = "text">
        <div className="back-button-padding"><Link className="button"to={"/events"}>Back</Link></div>
            <div className = "page-title">
                Create a new Event
            </div>
            <div className = "page-items">
                Name: 
            </div>
            <input  className ="input-box-style" type="text" placeholder="Event Name" onChange={nameChange}/>
            <div className = "page-items">
                Time:
            </div>
            <div style={{width: "100%"}}>
            <DatePicker         
                        className ="input-box-style"
                                selected={time}
                                onChange={(value, e) => timeChange(value, e)}
                                showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                            />
                            </div>
            <div className = "page-items">
                Category: 
                <Select className="select-style basic-multi-select"
                        name="colors"
                        options={categories}
                        classNamePrefix="select"
                        onChange={categoryChange}
                />
            </div>
            <div className = "page-items">
                Place: 
            </div>
            <input  className ="input-box-style" type="text" placeholder="Location" onChange={placeChange}/>
            <div className = "page-items">
                Number of People:
            </div>
            <input  className ="input-box-style" type="text" placeholder="Max Number" onChange={capacityChange}/>
            <div className = "page-items">
                Add a picture!:
            </div>
            <div className = "page-items">
                Event Photo URL: 
            </div>
            <input className ="input-box-style" type="text" onChange={eventPicChange}  />
            <div className="center">
              <button className="SignUpButton" onClick={handleEvent}>  Create Event! </button>
              </div>
            
        </div>
    </div>
);
}

export default CreateEventPage;

import React, { useState , useContext}  from 'react';
import '../styles/Activities.css';
import { useHistory, Link} from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import ImageUploader from 'react-images-upload';
import { AuthContext } from "../App";
import ENV from './../config.js'
const API_HOST = ENV.api_host

const onDrop = (p) => {
}

const NewActivityPage = () => {
    //will need a link to save the new activity to the server
    const context = useContext(AuthContext);
    const user = context.state.user;
    let history = useHistory();
        const [name, setName] = useState("");
          const [time, setTime] = useState(new Date());
          const [place, setPlace] = useState("");
          const [description, setDescription] = useState("");
          const [eventPic, setEventPic] = useState("");
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

          const descriptionChange = e => {
            setDescription(e.target.value);
            console.log(description);
        }

        const eventPicChange = e => {
            setEventPic(e.target.value);
            console.log(eventPic);
        }

          const isValidEvent = () => {
            return true;
        }
        
        const addEvent = () => {
          //This will need to become a server call to create events
          //{ 
          //  _id: "" + events.length, 
          //  detail: name, 
          //})
        }
          const handleEvent = () => {
            
            const body = {  
              description: name, 
              img: eventPic,
              detail: description, 
              username: user.username,
              userimg: user.profilePicture
            }
              
      
          fetch(`${API_HOST}/api/activities/`, {
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

        

  return (
    <div className = "border">
        <div className = "text">
            <div className = "page-title">
                New Activity
            </div >
            <div className = "loginFields">
            <div>
                Activity: 
            </div>
            <input className ="input-box-style-login" type="text" placeholder="workout, cycling etc." onChange={nameChange} />
            <div>
                Place: 
            </div>
            <input className ="input-box-style-login" type="text" placeholder="goldring, harbourfront etc." onChange={placeChange}/>
            <div>
                Experience:
            </div>
            <input className ="input-box-style-login" type="text" placeholder="Had an awesome workout!"  onChange={descriptionChange}/>
            <div>
                When: 
            </div>
            <DatePicker         
                        className ="input-box-style-login"
                                selected={time}
                                onChange={(value, e) => timeChange(value, e)}
                                showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                            />
            <div className = "page-items">
                Activity Photo URL: 
            </div>
            <input className ="input-box-style" type="text" onChange={eventPicChange}  />
            </div>
             <Link to="/activities" className="link">
            <button className = "loginButton" onClick={handleEvent}> Log Activity </button>
             </Link>
            <Link to="/activities" className="link">
                <button className = "loginButton">Back</button>
            </Link>
        </div>
    </div>
  );
}

export default NewActivityPage;

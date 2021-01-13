import React, { useState }  from 'react';
import "react-datepicker/dist/react-datepicker.css"
import { useHistory, Link} from "react-router-dom";
import ENV from './../config.js';

const API_HOST = ENV.api_host

const AddLocationPage = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [iconUrl, setIconURL] = useState("");


  const nameChange = e => {
    setName(e.target.value);
  }
  const descChange = e => {
    setDesc(e.target.value);
  }
  const latChange = e => {
    setLat(e.target.value);
  }

  const lngChange = e => {
    setLng(e.target.value);
  }
  
  const iconChange = e => {
    setIconURL(e.target.value);
  }


  const isValidLoc = () => {
    if(name === ""){
        console.log("Enter name")
        return false;
      }
      if(desc === ""){
        console.log("Enter desc")
        return false;
      }
      if(!Number.isInteger(parseInt(lng))){
        console.log("Enter valid lng")
        return false;
      }
      if(!Number.isInteger(parseInt(lat))){
        console.log("Enter valid lat")
        return false;
      }
    return true;
}

const addLoc = () => {
  const body = {
    "coord": {
        "lat": parseFloat(lat), 
        "lng": parseFloat(lng)
    },
    "icon": {
        "url": iconUrl,
        "scaledSize": 25
    },
    name: name,
    description: desc
  }

  fetch(`${API_HOST}/api/maplocations/`,{
    method: "post",
    body: JSON.stringify(body),
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
    }
})
  .catch(error => console.log(error));

}
  const handleLoc = () => {
    if(isValidLoc()){
        addLoc()
        history.push("/map");
    }else{
    }
}
      
  return (
    <div className = "border">
        <div className = "text">
        <div className="back-button-padding"><Link className="button"to={"/map"}>Back</Link></div>
            <div className = "page-title">
                Add a Location
            </div>
            <div className = "page-items">
                Name: 
            </div>
            <input className ="input-box-style" type="text" placeholder="Name" onChange={nameChange}/>
            <div className = "page-items">
                Description:
            </div>
            <input className ="input-box-style" type="text" placeholder="Description" onChange={descChange}/>
            <div className = "page-items">
                Lattitude:
            </div>
            <input className ="input-box-style" type="text" placeholder="Lattitude" onChange={lngChange}/>
            <div className = "page-items">
                Longitude:
            </div>
            <input className ="input-box-style" type="text" placeholder="Longitude" onChange={latChange}/>
            <div className = "page-items">
                Add an icon url:
            </div>
            <input className ="input-box-style" type="text" placeholder="Icon URL" onChange={iconChange}/>
            <div className="center">
              <button className="SignUpButton" onClick={handleLoc}>  Add Location! </button>
            </div>
            
        </div>
    </div>
);
}

export default AddLocationPage;

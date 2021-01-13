import React from 'react';
import '../styles/Activities.css';

const Activity = props => {
    return(
        <div className = "Activity"> 
        <div><img class= "ProfilePicture" alt="" src={props.activities.userimg}/>
        <h4 class="User">{props.activities.username}</h4></div>
        <div><img class="ActivityPicture" alt="" src= {props.activities.img}/></div>
            <div class='ActivityContent'>

                <h4>{props.activities.detail} </h4>
                {props.activities.description}
            </div>
        </div>
    ) 
}
export default Activity;
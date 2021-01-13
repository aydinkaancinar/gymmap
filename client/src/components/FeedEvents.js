import React, { useContext}  from 'react';
import '../styles/FeedEvents.css';
import { AuthContext } from "../App";
import {Link} from 'react-router-dom';



const FeedEvents = props => {
    const context = useContext(AuthContext);
    const user = context.state.user;
    return(
        <div className = "FeedEvent"> 
        <h4 class="EventText">Public Event</h4>
        <div><img class="EventPicture" alt="" src= {props.events.img}/></div>
            <div class='EventContent'>

                <h4>{props.events.category + " at " + props.events.place + " on " + props.events.time} </h4>
                {"Currently filled: " + props.events.attending + "/" + props.events.capacity}
            </div>
            {(!props.events.attendants.includes(user.username) && user.role !== 'admin') &&
                <Link 
                className="buttonf" 
                to={"/event/" + props.events._id}> 
                    Join 
                </Link>}
            {(props.events.attendants.includes(user.username) && user.role !== 'admin') &&
                <Link 
                className="buttonf-joined"
                to={"/event/" + props.events._id}> 
                    Going
                </Link>}
                {user.role === 'admin' &&
                <Link 
                className="buttonf"
                to={"/event/" + props.events._id}> 
                    Check
                </Link>}
        </div>
    ) 
}
export default FeedEvents;
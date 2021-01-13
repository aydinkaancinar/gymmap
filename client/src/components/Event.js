import React, { useContext}  from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from "../App";


const Event = props => {
    const context = useContext(AuthContext);
    const user = context.state.user;
    
    

    return(
        <tr className="table-items">
            <td> 
                <Link style ={{textDecoration: "none",
                color: "black"}} 
                to={"/event/" + props.events._id}> {props.events.name} </Link>
            </td>
            <td> {props.events.time} </td>
            <td> {props.events.place} </td>
            <td> {props.events.category} </td>
            <td> {props.events.attending + '/' + props.events.capacity} </td>
            <td>
            {(!props.events.attendants.includes(user.username) && user.role !== 'admin') &&
                <Link 
                className="button" 
                to={"/event/" + props.events._id}> 
                    Join 
                </Link>}
            {(props.events.attendants.includes(user.username) && user.role !== 'admin') &&
                <Link 
                className="button-joined"
                to={"/event/" + props.events._id}> 
                    Going
                </Link>}
                {user.role === 'admin' &&
                <Link 
                className="button"
                to={"/event/" + props.events._id}> 
                    Check
                </Link>}
            </td>
        </tr>
    )
}

export default Event;
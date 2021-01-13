import React, { useContext}  from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from "../App";

const Event = props => (
    <tr className="table-items">
        <td> {props.events.name} </td>
        <td> {props.events.time} </td>
        <td> {props.events.place} </td>
        <td> {props.events.category} </td>
        <td> {props.events.attending + '/' + props.events.capacity} </td>
        
        <td>
            <Link className="button" to={"/event/"+props.events._id}>Look at Event</Link>
        </td>
    </tr>
)

const MyEventsPage = () => {
  const context = useContext(AuthContext);
  const user = context.state.user;
  //will need server call to generate events list
  return (
      <div className = "border">
        <div className = "text">
        <div className = "table-title">
          <div className = "main-title"><h1> My Events </h1> </div>
          <div className="title-button">
            <Link className="button"to={"/events"}>Back</Link>
          </div>
        </div>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th> <h2>Event </h2> </th>
                            <th> <h2>Time </h2></th>
                            <th> <h2>Place</h2> </th>
                            <th> <h2>Category</h2> </th>
                            <th> <h2># of People</h2> </th>
                            <th> <h2>Actions</h2> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.eventsJoined.map(currentevent => {
                            return <Event events={currentevent} key={currentevent._id}/>;
                            })}
                    </tbody>
                </table>
                {user.eventsJoined.length === 0 && <Link className="SignUpButton"to={"/events"}>You don't have any events, join one!</Link>}
        </div>
    </div>
  );
}

export default MyEventsPage;

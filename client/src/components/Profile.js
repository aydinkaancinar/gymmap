import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfileComponent.css';
import { AuthContext } from "../App";


const Profile = () => {
  const context = useContext(AuthContext);
  const user = context.state.user;
  return (
    <div className='ProfileContainer'>
        <Link to="/profile">
          <img src={user.profilePicture} 
          className="ProfilePic"
          alt="ProfilePic"/>
          </Link>
        <Link to="/feed" className="ProfileNavLink">Feed</Link>
        <Link to="/profile" className="ProfileNavLink">Profile</Link>
        <Link to="/activities" className="ProfileNavLink">Activities</Link>
        <Link to="/events" className="ProfileNavLink">Events</Link>
        <Link to="/map" className="ProfileNavLink">Map</Link>
        {user.role === "admin" ?
        <Link to="/admin" className="ProfileNavLink">Admin Controls</Link>
        : null}
    </div>
  );
}

export default Profile;

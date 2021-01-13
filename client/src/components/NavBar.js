import React, { useContext } from 'react';
import '../styles/NavBar.css';
import Search from './Search.js';
import {Link} from 'react-router-dom';
import { AuthContext } from "../App";

const NavBar = () => {
  const context = useContext(AuthContext);
  const isAuthenticated = context.state.isAuthenticated;

  const handleSignOut = () =>{
    context.dispatch({
      type: "LOGOUT"
    })
  }

  return (
    <div className='NavBar'>
      <div className='Search'>
      {isAuthenticated ? <Search/> : null}
      </div>
      <Link to="/feed"> <p className="GymMap"> GymMap </p> </Link>
      {!isAuthenticated ? 
        <Link to="/login"> <p className="login"> Login </p> </Link>
        :
        <Link to="/login"> 
            <button onClick={handleSignOut} className="login"> Logout </button> 
        </Link>
      }
    </div>
  );
}

export default NavBar;

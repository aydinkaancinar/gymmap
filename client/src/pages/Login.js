import React, { useState } from 'react';
import '../styles/Login.css';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../App";
import profile from '../data/profileData';
import ENV from './../config.js'
const API_HOST = ENV.api_host

const LoginPage = () => {
    let history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = React.useContext(AuthContext);

    const userNameChange = e => {
        setUsername(e.target.value);
    }

    const passwordChange = e => {
        setPassword(e.target.value);
    }

    const handleSignIn = () => {
        // This will need a backend call to validate real users

        const body = JSON.stringify({
            "password": password,
            "username": username
        })
        fetch(`${API_HOST}/api/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : body
        })
        .then(res => res.json().then(data => {
            const payload = {
                user: data
            }
            dispatch({
                type: "LOGIN",
                payload: payload,
            })
        }))
        .catch(err => {
            console.log(err)
        });
    }

  return (
    <div className = "border">
        <div className = "text">
            <div className = "page-title">
                Login
            </div >
            <div className = "loginFields">
            <div>
                Username: 
            </div>
            <input
                className ="input-box-style-login"
                type="text" 
                placeholder="username" 
                onChange={userNameChange}/>
            <div>
                Password: 
            </div>
            <input 
                className ="input-box-style-login"
                type="password" 
                placeholder="password"
                onChange={passwordChange} />
            </div>
            <button className="loginButton" onClick={handleSignIn}> Log In </button>
            <Link to="/signup" className="link">
                <button className="loginButton">New User? Sign Up </button>
            </Link>
        </div>
    </div>
  );
}

export default LoginPage;

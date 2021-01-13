import React, { useState } from 'react';
import '../styles/SignUp.css';
import { AuthContext } from "../App";
import {Link} from 'react-router-dom';
import ENV from './../config.js'
const API_HOST = ENV.api_host


const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayInvalidPrompt, setdisplayInvalidPrompt] = useState(false);
    const { dispatch } = React.useContext(AuthContext);

    const userNameChange = e => {
        setUsername(e.target.value);
    }

    const passwordChange = e => {
        setPassword(e.target.value);
    }

    const handleSignUp = () => {
        const body = {
            username: username,
            password: password,
        }
        fetch(`${API_HOST}/api/users/`, {
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
                res.json().then(data => {
                    const payload = {
                        user: data
                    }
                    dispatch({
                        type: "LOGIN",
                        payload: payload,
                    })
                })
            } 
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div className = "border">
        <div className = "page-title">
                SignUp
            </div >
        <div className="SignUpFields">
            <div>
                Username: 
            <div>
            <input className ="input-box-style-login"
            type="text" 
                onChange={userNameChange} 
                placeholder="username" />
                <div className="invalidPrompt">
                    {displayInvalidPrompt ? "Invalid Username" : ""} </div>
                </div>
                Password: 
            </div>
            <input className ="input-box-style-login"
            type="password" 
                onChange={passwordChange} 
                placeholder="password" />
        </div>
        <button className="SignUpButton" onClick={handleSignUp}>  Sign Up </button><Link to="/login" className="link">
                <button className="loginButton">Back</button>
            </Link>

    </div>
  );
}

export default SignUpPage;

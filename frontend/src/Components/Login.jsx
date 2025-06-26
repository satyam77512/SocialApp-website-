import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';

import "./Login.css";

const Login = () => {
    const [UserName,setUserName] = useState('');
    const [Password,setPassword] = useState('');

    const UserData = useSelector((state)=>state.UserData);

    useEffect(()=>{
        if(UserData && UserData.UserName !=='')
        {
            navigate("/home");
        }
    },[])

    const Dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const headers = {
            "Content-Type": "application/json", // multer problem due to this
        };
        const loginPromise = axios.post(`${BaseUrl()}/user/auth/login`, {UserName,Password}, {
            headers: headers,
            withCredentials: true
        });
        toast.promise(
            loginPromise,
            {
                pending: 'Getting you logged in',
                error: 'Failed. Please try again.'
            }
        );
        try {
            const response = await loginPromise;
            
            Dispatch(
                setUserData({
                    Name:response.data.Name,
                    ProfileImage:response.data.ProfileImage,
                    UserName:response.data.UserName,
                    UserId:response.data._id
                })
            )
            setUserName('');
            setPassword('');
            navigate("/home");

        } catch (error) {
           toast.dismiss(); // remove loading
            if (error.response && error.response.status === 409) {
            toast.error("wrong Credentials");
            } else {
            toast.error("Login failed. Please try again.");
            }
            console.log("Server Error:", error);
        }
    }

    const forgotClick  = async(e)=>{
        e.preventDefault();
        const headers = {
            "Content-Type": "application/json", // multer problem due to this
        };
        const loginPromise = axios.post(`${BaseUrl()}/user/auth/email`, {UserName}, {
            headers: headers,
        });
        toast.promise(
            loginPromise,
            {
                pending: 'Please wait..',
                success:'Password reset link sent to your Email.',
                error: 'Failed. Please try again.'
            }
        );
    }

    return (
        <div className="login-wrapper">
            <ToastContainer/>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="UserName"
                        placeholder="Enter your username"
                        required
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        placeholder="Enter your password"
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="login-button">Login</button>
                <button
                    type="button"
                    className="signup-nav-button"
                    onClick={() => navigate("/signup")}
                >
                    Don't have an account? Sign Up
                </button>

                <button onClick={forgotClick}>Forgot Password</button>
            </form>
        </div>
    );
};

export default Login;

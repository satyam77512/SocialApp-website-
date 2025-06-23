import React, { useState } from 'react';
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';

import "./Signup.css";

const Signup = () => {

    const navigate = useNavigate();
    const Dispatch = useDispatch();

    const [formData,setFormData] = useState({
        Name:'',
        Email:'',
        UserName:'',
        Password:''
    })

    const handleChange=(e)=>{
       const {name,value} = e.target;
        setFormData({
            ...formData,
            [name] : value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault(); // for preventing reload
        const headers = {
          "Content-Type": "application/json",
        };

        const signUpPromise =  axios.post(
          `${BaseUrl()}/user/auth/signup`,
          formData,
          { headers }
        );

        toast.promise(
          signUpPromise,
          {
            pending: 'Registration in progress, please wait...',
            success: 'Registration successful!',
            error: 'Registration failed. Please try again.'
          }
        );

        try {
            const response = await signUpPromise;
            Dispatch(
                setUserData({
                    Name:response.data.Name,
                    ProfileImage:response.data.ProfileImage,
                    UserName:response.data.UserName,
                    UserId:response.data._id
                })
            );
            navigate("/home");
            setFormData({
                Name:'',
                Email:'',
                UserName:'',
                Password:''
            })
        } catch (error) {
            toast.dismiss(); // remove loading
            if (error.response && error.response.status === 409) {
            toast.error("User already exists.");
            } else {
            toast.error("Registration failed. Please try again.");
            }
            console.log("Error during signup:", error);
        }

    }

    return (
        <div className="signup-wrapper">
            <ToastContainer/>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name = "Name" value={formData.Name} onChange={handleChange} placeholder="Enter your name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="Email" value={formData.Email} onChange={handleChange} placeholder="Enter your email" />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name='UserName' value={formData.UserName} onChange={handleChange} placeholder="Choose a username" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="Password" value={formData.Password} onChange={handleChange} placeholder="Enter your password" />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                <button
                    type="button"
                    className="login-nav-button"
                    onClick={() => navigate("/")}
                >
                    Already have an account? Login
                </button>
            </form>
        </div>
    );
};

export default Signup;

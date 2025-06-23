import React, { useState, useEffect } from 'react';
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';
import PostCard from './PostCard.jsx';
import Header from './Header.jsx';
import SideNavbar from './SideNavbar.jsx';

import "./Profile.css";

const Profile = () => {
  const UserData = useSelector((state) => state.UserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserData || !UserData.UserId) {
      navigate("/login");
    }
  }, [UserData, navigate]);

  const [user,setUser] = useState({
    ProfileImage: '',
    Name:'',
    UserName:'',
    Email:'',
    DateOfBirth:'',
    PhoneNumber:'',
    Gender:'',
    Address:'',
    Profession:'',
    LikedPost:[],
  });

  useEffect(() => {
    const fetchData = async()=>{

      const UserId = UserData.UserId;

      const headers = {
        "Content-Type": "application/json", 
      };
      const likePromise = axios.post(`${BaseUrl()}/user/details/UserDetails`, {UserId}, {
          headers: headers,
      });
      
      toast.promise(likePromise,{
        pending:"fetching your information...",
      })

      try {
        const response = await likePromise;
        // console.log(response.data);
        setUser({
          ProfileImage:response.data.ProfileImage,
          Name:response.data.Name,
          UserName:response.data.UserName,
          Email:response.data.Email,
          DateOfBirth:response.data.DateOfBirth,
          PhoneNumber:response.data.PhoneNumber,
          Gender:response.data.Gender,
          Address:response.data.Address,
          Profession:response.data.Profession,
          LikedPost:response.data.LikedPost,
        })
      } catch (error) {

        toast.dismiss();

        toast.error("cannot fetch data");

        console.log(error);
      }

    }
    fetchData();
  }, []);




  const handleUpdate = () => {
    navigate("/update"); // adjust to your route
  };

  return (
    <>
    <Header/>
    <SideNavbar/>
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image-section">
          <img
            src={user.ProfileImage || "/default.png"}
            alt="Profile"
            className="profile-image"
          />
          <h2>{user.Name}</h2>
          <p className="username">@{user.UserName}</p>
        </div>

        <div className="profile-info">
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>Date of Birth:</strong> {new Date(user.DateOfBirth).toLocaleDateString()}</p>
          <p><strong>Phone:</strong> {user.PhoneNumber || "N/A"}</p>
          <p><strong>Address:</strong> {user.Address || "N/A"}</p>
          <p><strong>Gender:</strong> {user.Gender || "N/A"}</p>
          <p><strong>Profession:</strong> {user.Profession || "N/A"}</p>

          <button className="update-btn" onClick={handleUpdate}>Update Profile</button>
        </div>
      </div>
    </div>
     </>
  );
};

export default Profile;

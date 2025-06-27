import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Header.css";
import { useState } from "react";

const Header = () => {
  const UserData = useSelector((state) => state.UserData);
  const Navigate = useNavigate();

  const [LoggedIn, setLoggedIn] = useState(UserData.UserName);

  const handleClick = (e) => {
    e.preventDefault();
    Navigate("/logout");
  }
  
  return (
    <>
      {LoggedIn &&
        <header className="header">
          <div className="header-container">
            <div className="user-section">
              <div className="profile-pic">
                <img src={UserData.ProfileImage} alt="Profile" />
              </div>
              <div className="user-info">
                <h2 className="name">{UserData.Name}</h2>
                <p className="username">@{UserData.UserName}</p>
              </div>
            </div>
            <button className="logout-button" onClick={handleClick}>
              Logout
            </button>
          </div>
        </header>
      }
    </>
  );
};

export default Header;

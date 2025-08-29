import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

const Header = () => {
  const UserData = useSelector((state) => state.UserData);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  
    useEffect(() => {
      const authChecker = async () => {
        if (!UserData || !UserData.UserId || !UserData.UserName) {
          navigate("/logout"); // or "/" as you wish
          return;
        }
        
        try {
          const response = await axios.post(
            `${BaseUrl()}/check`,
            { UserName: UserData.UserName },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true
            }
          );
          // console.log(response);
          setAuth(true);
        } catch (error) {
          console.log("Auth failed:", error.message);
          navigate("/");
        }
      };
  
      authChecker();
    }, [UserData, navigate]);
  

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/logout");
  }
  
  return (
    <>
      {auth &&
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

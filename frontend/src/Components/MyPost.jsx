import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from '../BaseUrl.js';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import PostCard from "./PostCard.jsx";
import Header from "./Header.jsx";
import SideNavbar from "./SideNavbar.jsx";


const MyPosts = () => {

  const UserData = useSelector((state) => state.UserData);
  const navigate = useNavigate();
  const [PostArray, setPosts] = useState([]);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authChecker = async () => {
      if (!UserData && !UserData.UserId && !UserData.UserName) {
        navigate("/"); // or "/" as you wish
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


  useEffect(() => {
    const fetchMyPosts = async () => {
      if(!auth) return;
      try {
        const headers = {
          "Content-Type": "application/json", // multer problem due to this
        };
        const fetchPostPromise = axios.post(`${BaseUrl()}/user/details/userPost`, { UserId: UserData.UserId }, {
          headers: headers,
          withCredentials: true
        });

        toast.promise(fetchPostPromise, {
          pending: "fectching your posts..",
        })

        const response = await fetchPostPromise;
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error.message);
      }
    };
    fetchMyPosts();

  }, [auth])

  return (
    <>
      <ToastContainer />
      <Header />
      <SideNavbar />
      <div className="homepage-wrapper">
        <h2 className="feed-title">Recent Posts</h2>
        <div className='post-container'>
          {PostArray.length === 0 ? (
            <p className="no-posts">No posts available.</p>
          ) : (
            PostArray.map((Post, index) => (
              <PostCard key={index} post={Post} mypost={true} username={UserData.UserName} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyPosts;

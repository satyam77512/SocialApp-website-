import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from '../BaseUrl.js';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostCard from "./PostCard.jsx";
import Header from "./Header.jsx";
import SideNavbar from "./SideNavbar.jsx";


const MyPosts = () => {

  const UserData = useSelector((state) => state.UserData);
  const [PostArray, setPosts] = useState([]);
  useEffect(()=>{

    if(UserData.UserId)
    {

      const fetchMyPosts = async () => {
        try {
  
          const headers = {
            "Content-Type": "application/json", // multer problem due to this
          };
          const fetchPostPromise = axios.post(`${BaseUrl()}/user/details/userPost`, {UserId : UserData.UserId}, {
            headers: headers,
          });
  
          toast.promise(fetchPostPromise,{
            pending:"fectching your posts..",
          })
  
          const response = await fetchPostPromise;
          setPosts(response.data);
        } catch (error) {
          console.error("Failed to fetch posts:", error.message);
        } 
      };
      fetchMyPosts();
    }

  },[UserData])

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
                <PostCard key={index} post={Post} mypost = {true} username={UserData.UserName}/>
              ))
            )}
          </div>
         </div>
      </>
  );
};

export default MyPosts;

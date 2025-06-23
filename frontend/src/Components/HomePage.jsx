import React, { useState, useEffect } from 'react';
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';

import Header from "./Header";
import PostCard from './PostCard.jsx';
import SideNavbar from './SideNavbar.jsx';

import "./HomePage.css";

const HomePage = () => {
  const UserData = useSelector((state) => state.UserData);
  const navigate = useNavigate();

  useEffect(() => {
    if (UserData.UserName == '') {
      navigate('/');
    }
  }, [navigate, UserData]);

  const [PostArray, setPostArray] = useState([]);
  const [index,setIndex] = useState(0);
  const [available,setAvilable] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      const getPostsPromise = axios.post(
        `${BaseUrl()}/user/post/getAllPost`,
        {index},
        { headers }
      );
      
      toast.promise(getPostsPromise, {
        pending: 'Fetching Posts...',
      });
      
      try {
        const response = await getPostsPromise;
        setPostArray(response.data.posts);
        setAvilable(response.data.hasMore);
        setIndex(index+1);
      } catch (error) {
        toast.dismiss();
        toast.error("cannot fetch post..")
      }
    }

    fetchPost();
  }, [])

    const ClickHandler = async (e) => {

      e.preventDefault();
      const headers = {
        "Content-Type": "application/json",
      };
      const getPostsPromise = axios.post(
        `${BaseUrl()}/user/post/getAllPost`,
        {index},
        { headers }
      );
      
      toast.promise(getPostsPromise, {
        pending: 'Fetching Posts...',
      });
      
      try {
        const response = await getPostsPromise;
        setPostArray(prev => [...prev, ...response.data.posts]);
        setAvilable(response.data.hasMore);
        setIndex(index+1);
      } catch (error) {
        toast.dismiss();
        toast.error("cannot fetch post..")
      }
    }

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
              <PostCard key={index} post={Post} />
            ))
          )}
        </div>
        {available ? <button className="see-more" onClick={ClickHandler}>See more</button> : 'no more post avilable'}
      </div>
    </>
  )
}
export default HomePage;
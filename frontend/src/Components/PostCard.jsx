import React, { useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import "./PostCard.css";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from "react-router-dom";

const PostCard = ({ post , mypost = false , username="anonymous"}) => {
  const UserData = useSelector((state)=> state.UserData);

  const Navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [count,setCount] = useState(0);
useEffect(() => {
  if (UserData.UserId && post.likes) {
    setLiked(!!post.likes[UserData.UserId]);
    setCount(Object.keys(post.likes).length);
  }
}, [UserData.UserId, post.likes]);


// note that include() only work when both are strings


  const handleClick = async(e) => {

      if(liked)
      {
        setCount(count-1);
      }
      else{
        setCount(count+1);
      }
      setLiked(!liked);
      const User = UserData.UserId;
      const postId = post._id;

      e.preventDefault();

      const headers = {
        "Content-Type": "application/json", 
      };
      var likePromise = axios.post(`${BaseUrl()}/user/post/like`, {postId,User}, {
          headers: headers,
      });

      toast.promise(likePromise,{
        pending: "liking..",
        success:"done!",
        error:"server error",
      });

      // const response = await likePromise;
  };
  const deleteHandler = async(e)=>{

    e.preventDefault();

    const postId = post._id;
    const User = UserData.UserId;
    let ans = prompt("Do you want to delete this post ? (YES/NO)");
    if(ans==="YES")
    {
      try {
        const deletePromise = axios.post(`${BaseUrl()}/user/post/deletePost`, {postId,User});
        toast.promise(deletePromise, {
          pending: 'Deleting your Post...',
          success: 'Please refesh the page!',
          error:"some error occur"
        });
  
        await deletePromise;
        Navigate("/myposts");
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <>
    <div className="post-card">
      <div className="post-header">
        <div className="username">@{post.user?.UserName || username}</div>
        {
          mypost ? <button className="like-button delete-button" onClick={deleteHandler}>delete</button>: ''
        }
      </div>

      {post.postImage && (
        <div className="post-image">
          <img src={post.postImage} alt="Post" />
        </div>
      )}

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        <button className="like-button" onClick={handleClick}>
          <span className="like-icon">{liked ? "❤️" : "🤍"}</span>
        </button>
          <span className="like-count">{count} love</span>
      </div>

    </div>
    </>
  );
};

export default PostCard;

import React, { useState,useEffect} from 'react';
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector} from "react-redux";
import { setUserData, setUserID } from '../Redux/actions.js';
import SideNavbar from './SideNavbar.jsx';
import Header from "./Header.jsx";

import "./CreatePost.css";

const CreatePost = () => {
    const UserData = useSelector((state)=> state.UserData);
    const navigate = useNavigate();
    const [UserName,setUserName] = useState('');
    useEffect(()=>{
        if(UserData.UserName=='')
        {
            navigate('/login');
        }
        else
        {
            setUserName(UserData.UserName);
        }
    },[navigate,UserData]);
    

    const [postImage,setImage] = useState('');
    const [content,setContent] = useState('');

    const submitHandler = async(e)=>{

        e.preventDefault();
        const headers = {
          "Content-Type": "multipart/form-data", 
        };
        const createPromise = axios.post(`${BaseUrl()}/user/post/createPost`, {postImage,content,UserName}, {
            headers: headers,
        });
         toast.promise(
          createPromise,
          {
            pending: 'creating your post...',
            success: 'Registration successful!',
            error: 'Failed. Please try again.'
          }
        );
      
        try {
            const response = await createPromise;
            navigate("/home");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Header/>
            <SideNavbar/>
            <div className="create-post-wrapper">
                <ToastContainer/>
                <form className="create-post-form" onSubmit={submitHandler}>
                    <h2>Create a Post</h2>

                    <div className="form-group" >
                        <label htmlFor="image">Select an Image</label>
                        <input type="file" id="image" accept="image/*"
                        onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Write something for the post"
                            onChange={(e)=>setContent(e.target.value)}
                            value={content}
                        ></textarea>
                    </div>

                    <button type="submit" className="create-button">Create</button>
                </form>
            </div>
        </>
    );
};

export default CreatePost;

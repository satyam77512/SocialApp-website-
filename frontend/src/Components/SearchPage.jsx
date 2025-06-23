import React, { useState } from 'react';
import { BaseUrl } from '../BaseUrl.js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideNavbar from './SideNavbar';
import Header from './Header';
import PostCard from './PostCard.jsx';

import './SearchPage.css';

const SearchPage = () => {
    const [username, setUsername] = useState('');
    const [userdata, setUserdata] = useState(null);
    const [posts, setPosts] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const headers = {
                "Content-Type": "application/json",
            };

            const getUserPromise = axios.post(
                `${BaseUrl()}/user/details/search`,
                { username },
                { headers }
            );

            toast.promise(getUserPromise, {
                pending: "Searching user...",
                success: "Found!",
            });

            const response = await getUserPromise;
            setUserdata(response.data.data);
            setPosts(response.data.posts || []);
        } catch (error) {
            toast.dismiss();
            setUserdata(null);
            setPosts([]);
            if (error.response?.status === 409) {
                toast.error("User does not exist");
            } else {
                toast.error("Server error, please try again!");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <Header />
            <SideNavbar />
            <div className="search-page-container">
                <div className="search-content">
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search by username..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>

                    {userdata && (
                        <div className="user-profile">
                            <img
                                src={userdata.ProfileImage}
                                alt="Profile"
                                className="profile-img"
                            />
                            <div className="user-info">
                                <h2>{userdata.Name}</h2>
                                <p><strong>Username:</strong> {userdata.UserName}</p>
                                <p><strong>Email:</strong> {userdata.Email}</p>
                                <p><strong>Address:</strong> {userdata.Address=="add your address.." ? "NA" : userdata.Address}</p>
                            </div>
                        </div>
                    )}

                    {posts.length > 0 && (
                        <div className="user-posts">
                            <h3>User's Posts</h3>
                            {posts.map((post, idx) => (
                               <PostCard post={post} key={idx} username={userdata.UserName}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchPage;

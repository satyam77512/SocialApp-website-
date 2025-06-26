import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from '../Redux/actions.js'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BaseUrl } from '../BaseUrl.js';
import axios from "axios";

const Logout = () => {

    const Dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        const clearData = async() => {
            await axios.post(
                `${BaseUrl()}/user/auth/logout`,
                {},
                { withCredentials: true }
            );
            Dispatch(
                setUserData({
                    Name: '',
                    ProfileImage: '',
                    UserName: '',
                    UserId: ''
                })
            );
            Navigate("/");
        }

        clearData();
    }, [])

    return (
        <>
            Getting you logged out
        </>
    )
}

export default Logout;
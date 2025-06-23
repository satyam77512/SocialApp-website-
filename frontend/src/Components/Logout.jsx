import React from "react";
import { useDispatch } from "react-redux";
import { setUserData } from '../Redux/actions.js'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {

    const Dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        const clearData = () => {
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
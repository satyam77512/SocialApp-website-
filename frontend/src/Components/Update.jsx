import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserdata } from "../Redux/actions.js";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from '../BaseUrl.js';
import axios from "axios";


import Header from "./Header";
import SideNavbar from "./SideNavbar";


import "./Update.css";
import { toast, ToastContainer } from "react-toastify";

const Update = () => {
  const user = useSelector((state) => state.UserData);
  const Dispatch = useDispatch();

  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Email: "",
    postImage: "",
    DateOfBirth: "",
    Address: "",
    PhoneNumber: "",
    Profession: "",
    Gender: "",
  });

  const navigate = useNavigate();

  useEffect(() => {

    const fetchCurrentDetails = async()=>{

      const UserId = user.UserId;
      const headers = {
        "Content-Type": "application/json",
      };
      const currentDetailsPromise = axios.post(
        `${BaseUrl()}/user/details/UserDetails`,{UserId},
        { headers }
      );
      
      toast.promise(currentDetailsPromise,{
          pending:"fetching your current details...",
        }
      );

      try {
        const response = await currentDetailsPromise;
        setFormData({
            Name: response.data.Name,
            UserName: response.data.UserName,
            Email: response.data.Email,
            postImage: response.data.ProfileImage,
            DateOfBirth: response.data.DateOfBirth ? new Date(response.data.DateOfBirth)
            .toISOString().split("T")[0] : "",
            Address: response.data.Address || "add your address..",
            PhoneNumber: response.data.PhoneNumber || "add your phone number",
            Profession: response.data.Profession || "add your profession",
            Gender: response.data.Gender|| "",
        })

      } catch (error) {
        toast.dismiss();
        toast.error("server error try again !");
      }
    }

    fetchCurrentDetails();
  }, []);

  // console.log(formData.Email);

  const handleChange = (e) => {
    const {name,value,type,files} = e.target;
    setFormData({
      ...formData,
      [name]:(type==='file' ? files[0] : value),
    })
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const headers = {
      "Content-Type": "multipart/form-data",
    };
  
    const updatePromise = axios.post(
      `${BaseUrl()}/user/details/update`,
      formData,
      { headers }
    );

    toast.promise(updatePromise,{
      pending:"updating your details..",
      success : "Done !",
    })

    try {

      const response = await updatePromise;
      
      Dispatch(updateUserdata("ProfileImage",response.data.ProfileImage));
      Dispatch(updateUserdata("Name",response.data.Name));

      navigate("/profile");
    } catch (error) {
      toast.dismiss();
      toast.error("failed to update try again..");
    }
  };

  return (
    <>
        <Header/>
        <SideNavbar/>
        <ToastContainer/>
    <div className="update-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update Profile</h2>

        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
        />

        <label htmlFor="">Profile Picture :</label>
        <input
          type="file"
          name="postImage"
          onChange={handleChange}
        />

        <input
          type="date"
          name="DateOfBirth"
          value={formData.DateOfBirth}
          onChange={handleChange}
        />

        <input
          type="text"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          placeholder="Address"
        />

        <input
          type="text"
          name="Profession"
          value={formData.Profession}
          onChange={handleChange}
          placeholder="Profession"
        />

        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </div>
     </>
  );
};

export default Update;

// import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup } from "../service/api";
import axios from "axios";

const SignupForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  async function submitHandler(event) {
    setIsLoading(true);
    console.log("FORM",formData);
    event.preventDefault();
    try {
       if (formData.password != formData.confirmPassword) {
         toast.error("Password do not match");
         return;
       }
        const config = {
        headers: {
          "Content-type": "application/json",
        }
      };

        
       const res=await axios.post('http://localhost:4000/api/v1/signup',formData,config);
       console.log(res);
       setIsLoggedIn(true);
       res && navigate("/login");
       toast.success("Account Created");
    } catch (error) {
      toast.error("something went wrong");
    }
    setIsLoading(false);

    // const data=await signup(formData);
    // console.log(data);
    
  }

  return (
    <div>
      {/* student instructor tab */}
      
      <form onSubmit={submitHandler}>
        {/* firsname last name container */}
        <div className="flex w-full gap-x-4  mt-[10px]">
          <label className="w-full mt-[10px]">
            <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              value={formData.firstname}
              required
              name="firstname"
              onChange={changeHandler}
              placeholder="Enter First Name"
              className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
            />
          </label>
          <label className="w-full mt-[10px]">
            <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              value={formData.lastname}
              required
              name="lastname"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
            />
          </label>
        </div>
        <div className="mt-[20px]"></div>
        <label className="w-full mt-[10px]">
          <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            value={formData.email}
            required
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email Address"
            className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
          />
        </label>
        {/* create password and confirm password */}
        <div className="flex gap-x-4 mt-[10px] ">
          <label className="w-full relative mt-[10px]">
            <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              required
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>

          <label className="w-full relative mt-[10px]">
            <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              required
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>
        <button className="bg-yellow-50 rounded-[8px] w-full mt-6 font-medium text-richblack-900 px-[12px] py-[8px]">
          {isLoading?"LOADING ->>>":"Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

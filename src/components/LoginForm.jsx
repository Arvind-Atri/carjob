// import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  console.log(formData);
  const [showPassword, setShowPassword] = useState(false);
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      
      const res = await axios.post(
        "http://localhost:4000/api/v1/login",
        { email: formData.email, password: formData.password },
        config
      );
      console.log("res", res);
      const authData=res.data.user;
      localStorage.setItem("userInfo", JSON.stringify(authData));
      toast.success("Logged In");
      setIsLoggedIn(true);
      navigate("/Dashboard");
    } catch (error) {
        toast.error("Failed To Login");
    }
    setIsLoading(false);
  }
  return (
    <form
      className="flex flex-col mt-6 gap-y-6 w-full"
      onSubmit={submitHandler}
    >
      <label className="w-full">
        <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Address"
        />
      </label>

      <label className="w-full relative ">
        <p className="text-[0.875rem text-richblack-5 mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          className="bg-richblack-800 rounded w-full text-richblack-5 p-[12px]"
          required
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
        />

        <span
          className="absolute right-3 top-[38px] cursor-pointer "
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fill="#AFB2BF" fontSize={24} />
          )}
        </span>
      </label>
      <Link to="#">
        <p className="text-xs mt-1 text-blue-100 ml-auto max-w-max">
          Forgot Password
        </p>
      </Link>

      <button className="bg-yellow-50 rounded-[8px] mt-6 font-medium text-richblack-900 px-[12px] py-[8px]">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;

import React from 'react'
import car1 from "../assets/car1.jpg"
import car2 from "../assets/car2.jpg"
import car3 from "../assets/car3.jpg"
import  loginImg  from "../assets/login.png";
import Template from '../components/Template';

const Login = ({setIsLoggedIn}) => {
  return (
    <div className="bg-richblack-900">
      <Template
        title="Welcome Back"
        desc1="Build skills for today,tomorrow, and beyond."
        desc2="Education to future-proof your career."
        image={loginImg}
        formType="login"
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
}

export default Login
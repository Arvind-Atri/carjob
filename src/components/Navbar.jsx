import React from 'react'
import logo from '../assets/Logo.svg'
import { Link, useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
const Navbar = (props) => {

  let isLoggedIn=props.isLoggedIn;
  let setIsLoggedIn=props.setIsLoggedIn;
  
  const location=useLocation();
  const currPage=location.pathname.split("/").pop();
  console.log(currPage);
  return (
    <div className="flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto ">
      <Link to="/">
        <h2 className='text-yellow-50 font-extrabold text-2xl ' >CAR WILLA</h2>
      </Link>
      <nav>
        <ul className="flex gap-x-6 text- text-richblack-100 ">
          <li>
            <Link to="/"><span className='text-yellow-50' >CartList</span></Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <Link to="/login">
            <button
              className={`bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 ${
                currPage === "login" ? "bg-yellow-50 text-black " : ""
              }`}
            >
              Log in
            </button>
          </Link>
        )}
        {!isLoggedIn && (
          <Link to="/signup">
            <button
              className={`bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 ${
                currPage === "signup" ? "bg-yellow-50 text-black " : ""
              }`}
            >
              Sign up
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/">
            <button
              className={`bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 `}
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}
            >
              Logout
            </button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/Dashboard">
            <button
              className={`bg-richblack-800 text-richblack-100 py-[8px] px-[12px] rounded-[8px] border border-richblack-700 ${
                currPage === "Dashboard" ? "bg-yellow-50 text-black " : ""
              }`}
            >
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar
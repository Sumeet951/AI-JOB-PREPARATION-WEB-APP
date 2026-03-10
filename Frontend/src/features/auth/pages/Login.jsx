import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { loginAccount } from "../../../redux/slices/authSlice";
import {useDispatch} from "react-redux";

const Login = () => {
  const [LoginData,setLoginData]=useState({
    email:"",
    password:""
  })
  const dispatch=useDispatch();
  const navigate=useNavigate();
  {/**Handle User Input */}
  function handleUserInput(e){
    const {name,value}=e.target;
    setLoginData({
      ...LoginData,[name]:value
    })
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!LoginData.email || !LoginData.password){
      toast.error("Please fill all the fields");
      return;
    }
    const response=await dispatch(loginAccount(LoginData));
    if(response.payload?.data){
      navigate("/");
      
    }
    setLoginData({
      email:"",
      password:""
    })
  }
  return (
    <div className="flex  font-Jakarta justify-center items-center w-full h-screen">
      <div
        className="flex  flex-col pb-20 w-[537px] border border-[#D6D6D6] 
 px-12  rounded-3xl "
      >
        <div>
          <div className="text-3xl font-semibold  mt-16">Login</div>
          <div className="text-25 mt-2 font-normal leading-normal text-black ">
            to get started
          </div>
        </div>
        {/*Input*/}
        <div className="flex flex-col gap-9 mt-8">
          <input
            className="w-full shadow-[0_10px_40px_rgba(174,174,174,0.25)]
 border border-gray-200 px-4 py-3.5 rounded-2xl text-gray-800"
            type="text"
            name="email"
            placeholder="Email"
            value={LoginData.email}
            onChange={handleUserInput}
          />
          <input
            className="w-full shadow-[0_10px_40px_rgba(174,174,174,0.25)]
 border border-gray-200 px-4 py-3.5 rounded-2xl text-gray-800"
            type="password"
            name="password"
            value={LoginData.password}
            onChange={handleUserInput}
            placeholder="Password"
          />
        </div>
        {/*Button*/}
        <button onClick={handleSubmit}
          className=" cursor-pointer mt-15 w-full py-4 rounded-[10px] text-white border border-[#EAEAEA] bg-[#0016DF] shadow-[0_10px_40px_rgba(174,174,174,0.20)]
"
        >
          Login In
        </button>
        <Link to="/register">
          <p className="cursor-pointer flex justify-center  text-[14px] font-light mx-auto mt-10">
            New User? Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

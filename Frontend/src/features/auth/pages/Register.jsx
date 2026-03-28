import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { createAccount } from '../../../redux/slices/authSlice';

const Register = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [signUpData,setsignUpData]=useState({
    username:"",
    email:"",
    password:""
  });
  function handleUserInput(e){
    const {name,value}=e.target;
    setsignUpData({
      ...signUpData,[name]:value
    });
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!signUpData.username || !signUpData.email || !signUpData.password){
      toast.error("Please fill all the field")
    }
    //api call
    const response=await dispatch(createAccount(signUpData));
    if(response.payload?.data?.message){
      navigate("/home");
    }
    setsignUpData({
      email:"",
      username:"",
      password:""
    })

  }
  return (
    <div>
       <div className='flex  font-Jakarta justify-center items-center w-full h-screen'>
    <div className='flex  flex-col pb-20 w-[537px] border border-[#D6D6D6] 
 px-12  rounded-3xl '>
        <div>
            <div className='text-3xl font-semibold  mt-16'>SignUp</div>
        <div className='text-25 mt-2 font-normal leading-normal text-black '>to get started</div>
        </div>
        {/*Input*/}
        <div className='flex flex-col gap-8 mt-8'>
            <input className='w-full shadow-[0_10px_40px_rgba(174,174,174,0.25)]
 border border-gray-200 px-4 py-3.5 rounded-2xl text-gray-800'   type="text"
            name="username"
            value={signUpData.username}
            onChange={handleUserInput}
            placeholder='Username'
            />
            <input className='w-full shadow-[0_10px_40px_rgba(174,174,174,0.25)]
 border border-gray-200 px-4 py-3.5 rounded-2xl text-gray-800'   type="text"
            name="email"
            value={signUpData.email}
            onChange={handleUserInput}
            placeholder='Email'
            />
            <input className='w-full shadow-[0_10px_40px_rgba(174,174,174,0.25)]
 border border-gray-200 px-4 py-3.5 rounded-2xl text-gray-800'   type="password"
            name="password"
            onChange={handleUserInput}
            value={signUpData.password}
            placeholder='Password'
            />
        </div>
        {/*Button*/}
       <button onClick={handleSubmit} className=' cursor-pointer mt-15 w-full py-4 rounded-[10px] text-white border border-[#EAEAEA] bg-[#0016DF] shadow-[0_10px_40px_rgba(174,174,174,0.20)]
'>Sign Up</button>
        <Link to="/login"><p className='cursor-pointer flex justify-center text-[14px] font-light mx-auto mt-10'>Already registered? Login</p>
</Link>
    </div>


   </div>
   
    </div>
  )
}

export default Register

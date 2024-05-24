import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../features/auth/authSlice";

const Register = () => {

  const {isLoading,isError,isSuccess,message,user} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    name : "",
    email : "",
    password : "",
    password2 : "",
  });

  const {name , email , password , password2} = formData;

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(password !== password2)
    {
      toast.error("Password Not Match!");
    }
    else{
      dispatch(registerUser(formData));
    }
  };

  useEffect(()=>{
    if(user)
    {
      navigate("/");
    }
    
    if(isError && message)
    {
      toast.error(message);
    }
  },[user,isError,message])

  if(isLoading)
  {
    return <h1 className='text-center text-secondary mt-5'>Loading...</h1>
  }

  return (
    <div className='container p-5'>
      <div className="card p-3 rounded-0">
        <h3 className='text-center text-secondary'>Register Here</h3>

        <form className='my-2' onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter Name' className='form-control my-3 rounded-0'
            name="name" onChange={handleChange} value={name} required/>
          <input type="email" placeholder='Enter Email' className='form-control my-3 rounded-0'
            name="email" onChange={handleChange} value={email} required/>
          <input type="password" placeholder='Enter Password' className='form-control my-3 rounded-0'
            name="password" onChange={handleChange} value={password} autoComplete='password' required/>{" "}
          <input type="password" placeholder='Confirm Password' className='form-control my-3 rounded-0'
            name="password2" onChange={handleChange} value={password2} autoComplete='password2' required/>
          <button type='submit' className='btn btn-success w-100 rounded-0 my-2' style={{fontWeight:'500'}}>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register;

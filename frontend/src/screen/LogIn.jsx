import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const LogIn = () => {

  const {isLoading,isError,isSuccess,message,user} = useSelector((state)=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email : "",
    password : "",
  });

  const {email,password} = formData;

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(()=>{
    if(user){
      navigate("/");
    }

    if(isError && message)
    {
      toast.error(message);
    }
  },[isError,message,user]);

  return (
    <div className='container p-5'>
      <div className="card p-3 rounded-0">
        <h3 className='text-center text-secondary'>Login Here</h3>

        <form className='my-2' onSubmit={handleSubmit}>
          <input type='email' placeholder='Enter Email' className='form-control my-2 rounded-0'
            name='email' onChange={handleChange} value={email} required/>
          <input type='password' placeholder='Enter Password' className='form-control my-2 rounded-0'
            name='password' onChange={handleChange} value={password} required/>
          <button type='submit' className='btn btn-success w-100 rounded-0 my-2' style={{fontWeight:'500'}}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn;

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { raiseTicket } from '../features/ticket/ticketSlice';
import { toast } from 'react-toastify';
import Backbutton from '../Components/Backbutton';

const CreateTicket = () => {

  const {user} = useSelector((state)=>state.auth);

  const {isLoading,isError,isSuccess,message,ticket} = useSelector((state)=>state.ticket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    product : "",
    description : "",
  });

  const {product,description} = formData;

  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(raiseTicket(formData));
    if(ticket && isSuccess)
    {
      navigate("/user/tickets");
    }
  };

  useEffect(()=>{
    if(isError)
    {
      toast.error(message);
    }
  },[isError,message])

  return (
    <div className="container p-5">
         
        <Backbutton url={"/"}/>
        <div className="card p-3 rounde-0">
            <h3 className='text-center'>Raise Ticket</h3>

            <form className='my-2' onSubmit={handleSubmit}>
                <input value={user?.name} style={{fontWeight:"500"}} type='text' className='my-2 form-control rounded-0' disabled/>
                <input value={user?.email} style={{fontWeight:"500"}} type='email' className='my-2 form-control rounded-0' disabled/>
                <select className='my-3 form-select rounded-0'
                 onChange={handleChange} name="product" value={product} style={{fontWeight:"450"}}  required>
                    <option value="iPhone">iPhone</option>
                    <option value="iPad">iPad</option>
                    <option value="Macbook">Macbook</option>
                    <option value="iMac">iMac</option>
                    <option value="iWatch">iWatch</option>
                </select>
                <textarea className='form-control rounded-0 my-2'
                 onChange={handleChange} name="description" value={description} style={{fontWeight:"440"}}  placeholder='Describe Your Issue!' required></textarea>
                <button type='submit' className='btn btn-dark w-100 rounded-0 my-2' style={{fontWeight:"500"}} >Raise Ticket</button>
            </form>
        </div>
    </div>
  )
}

export default CreateTicket;

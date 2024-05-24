import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicket } from '../features/ticket/ticketSlice';
import Backbutton from '../Components/Backbutton';

const SingleTicket = () => {

  const {ticket} = useSelector((state)=>state.ticket);

  const {id} = useParams();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // for close button 
  const handleClose = () =>{
    navigate("/user/tickets");
  }

  useEffect(()=>{
    dispatch(getTicket(id));
    console.log(id);
  },[]);

  return (
    <div className="container p-5">
      <Backbutton url={"/tickets"}/>
      <div className="card p-3 rounded-0">
        <p className='text-secondary'>Ticket Id :{id}</p>
        <h3>Product Name : {ticket?.product}</h3>
        <h5 className='text-secondary'>Product Issue : {ticket?.description}</h5>
        <p className='text-secondary'>Ticket Date : {new Date(ticket?.createdAt).toLocaleDateString("en-IN")}</p>
        <p className='text-secondary'>Ticket Status : 
          <span class="badge text-bg-success rounded-0">{ticket?.status}</span>
        </p>
        <h4>Notes :</h4>
        <button className='btn btn-dark btn-sm rounded-0'>Add Note</button>
        <ul className='list-group my-2'>
          <li className='list-group-item rounded-0'>Please Resolve My Issue</li>
        </ul>
      </div>

      <button onClick={handleClose} className='btn btn-danger w-100 my-5 rounded-0'>Close Ticket</button>
    </div>
  )
}

export default SingleTicket;

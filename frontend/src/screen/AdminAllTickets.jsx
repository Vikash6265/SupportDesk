import React, { useEffect } from 'react'
import Backbutton from '../Components/Backbutton'
import TicketRow from '../Components/TicketRow'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllUsersTickets } from '../features/ticket/ticketSlice'


const AdminAllTickets = () => {

    const {tickets,isError,message} = useSelector((state)=>state.ticket);

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getAllUsersTickets());

        if(isError && message)
        {
            toast.error(message);
        }
    },[isError,message])

  return (
    <div className="container p-5">
    
    <Backbutton url={"/"}/>
    <div className="card rounded-0 p-3">
      <h3 className='text-center'>All Users Tickets</h3>

      <table class="table">
       <thead>
         <tr>
           <th scope='col'>#</th>
           <th scope='col'>Product</th>
           <th scope='col'>Date</th>
           <th scope='col'>Status</th>
           <th scope='col'></th>
         </tr>
       </thead>
       <tbody>
         {
           tickets.map((ticket,index) =>(
             <TicketRow key={ticket._id} ticket={ticket} index={index}/>
           ))
         }
       </tbody>
      </table>
    </div>
  </div>
  )
}

export default AdminAllTickets;

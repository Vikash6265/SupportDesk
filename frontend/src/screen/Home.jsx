import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {

  const {isLoading,isError,isSuccess,message,user} = useSelector((state)=>state.auth);

  // admin usercreate me name Admin or email admin@gmail.com he
  const isAdmin = user?.email === "admin@gmail.com" && user?.name === "Admin";

  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate("/logIn");
    }
  },[user]);

  if(isLoading)
  {
    return <h1 className='text-center text-secondary mt-5'>Loading...</h1>
  }

  return (
    <div className='container p-5'>

      <div className="card p-3 rounded-0 my-2">
        <h3 className='text-center text-dark'>Welcome {user?.name} To Support App</h3>
        {
          isAdmin ? (
            <Link to={"/user/admin/all-tickets"} className="btn btn-outline-dark w-100 my-2">Views All Tickets</Link>
          )
          :
          (
            <>
              <Link to={"/user/create"} className="btn btn-outline-dark w-100 my-2">Raise Ticket</Link>
              <Link to={"/user/tickets"} className="btn btn-outline-dark w-100 my-2">Views Ticket</Link>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Home;
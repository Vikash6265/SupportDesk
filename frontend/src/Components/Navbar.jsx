import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../features/auth/authSlice';

const Navbar = () => {

  const {user} = useSelector((state)=>state.auth);

  const dispatch =useDispatch();

  const handleLogOut = () =>{
    dispatch(logOutUser());
  }

  return (
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <Link to={'/'} className="navbar-brand mb-0 h1">Support App 1.5v</Link>
          {
            user ? (
              <button onClick={handleLogOut} className="btn btn-sm btn-danger mx-1 rounded-1" style={{fontWeight:550}}>LogOut</button>
            )
            :
            (
              <>
                <span>
                  <Link to={'/logIn'} className="btn btn-sm btn-primary mx-1 rounded-1" style={{fontWeight:500}}>LogIn</Link>
                  <Link to={'/register'} className="btn btn-sm btn-primary mx-1 rounded-1" style={{fontWeight:500}}>Register</Link>
                </span>
              </>
            )
          }
        </div>
    </nav>
  )
}

export default Navbar;
import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screen/Home';
import Register from './screen/Register';
import LogIn from './screen/LogIn';
import SingleTicket from './screen/SingleTicket';
import AllTickets from './screen/AllTickets';
import CreateTicket from './screen/CreateTicket';
import PageNotFound from './screen/PageNotFound';
import PrivateRoute from './screen/PrivateRoutes';
import AdminAllTickets from './screen/AdminAllTickets';

const App = () => {

  // Private Route bnaya he to ab sbhi routing route ke age "/user" route lagega
  // Jo bhi inside Private Route honge unke aage "/user" lagega
  // 1. ex : /logIn == /logIn ye nhi he to esme nhi lagega
  // 2. ex : tickets == /user/tickets ye esme lagega kyuki ye inside PrivateRoute he
  
  return (
    <Router>
     <Navbar/>
     <Routes>
      <Route path='*' element={<PageNotFound/>}/>
      <Route path='/logIn' element={<LogIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>

      <Route path='/user' element={<PrivateRoute/>}>  
    
      <Route path='create' element={<CreateTicket/>}/>
      <Route path='ticket/:id' element={<SingleTicket/>}/>
      <Route path='tickets' element={<AllTickets/>}/>
      <Route path='admin/all-tickets' element={<AdminAllTickets/>}/>

      </Route>

     </Routes>
     <ToastContainer/>
    </Router>
  )
}

export default App;
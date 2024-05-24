import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hook/useAuthStatus";

const PrivateRoute = () =>{
    const {isLoggedIn,checkStatus} = useAuthStatus();

    if(checkStatus)
    {
        return <h1 className="my-5 text-center">Loading...</h1>
    }

    return isLoggedIn ? <Outlet/> : <Navigate to={"/logIn"}/>
}

export default PrivateRoute;
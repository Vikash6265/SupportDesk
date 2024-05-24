import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const useAuthStatus = () =>{
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [checkStatus,setCheckStatus] = useState(true);

    const {user} = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(user)
        {
            setLoggedIn(true)
        }
        else{
            setLoggedIn(false)
        }
        setCheckStatus(false);
    },[user]);

    return {isLoggedIn,checkStatus};
}

export default useAuthStatus;
import axios from "axios";

const API_URL = "/api/ticket";

const addTicket = async (formData,token) =>{
    const options = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    };
 
    const response = await axios.post(API_URL,formData,options);
    return response.data;
}

const fetchTickets = async (token) =>{
    const options = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    };

    const response = await axios.get(API_URL,options);
    return response.data;
}

const fetchTicket = async (id,token) =>{
    const options = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    };

    const response = await axios.get(API_URL + "/" + id ,options);
    return response.data;
}

// ADMIN API/ROUTES

const fetchAllUsersTickets = async(token) =>{
    const options = {
        headers : {
            Authorization : `Bearer ${token}`,
        }
    };

    const response = await axios.get("/api/admin/tickets", options);
    return response.data;
};


const ticketService ={
    addTicket,
    fetchTickets,
    fetchTicket,
    fetchAllUsersTickets,
}

export default ticketService;
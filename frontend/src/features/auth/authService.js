import axios from "axios";

const API_URL = "/api/user";

const registerData = async(formData) =>{
    const response = await axios.post(API_URL , formData);
    localStorage.setItem("user",JSON.stringify(response.data));
    return response.data;
};

const loginData = async(formData) =>{
    const response = await axios.post(API_URL + "/login", formData);
    localStorage.setItem("user",JSON.stringify(response.data));
    return response.data;
}

const authService = {
    registerData,
    loginData,
};     // key value same hota he esliye ek ko hi bhej skte he

export default authService;
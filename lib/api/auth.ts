//AUTHENTICATION API CALLS
import {API} from "./endpoints";
import axios from "./axios";
export const  register = async(registrationData:any) =>{
    try{
        const repsonse = await axios.post(API.AUTH.REGISTER,registrationData)
        return repsonse.data;
    }catch(err:Error |any){
        throw new Error(err.response?.data.message ||err.message || "Registration failed");
    }
}


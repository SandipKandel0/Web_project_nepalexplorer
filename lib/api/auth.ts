//AUTHENTICATION API CALLS
import {API} from "./endpoints";
import axios from "./axios";
import { getAuthToken } from "../cookies";

export const  register = async(registrationData:any) =>{
    try{
        const repsonse = await axios.post(API.AUTH.REGISTER,registrationData)
        return repsonse.data;
    }catch(err:Error |any){
        throw new Error(err.response?.data.message ||err.message || "Registration failed");
    }
    }
    export const login = async (loginData: any) => {
    try {
        const response = await axios.post(API.AUTH.LOGIN, loginData);
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
        err.response?.data?.message || err.message || "Login failed"
        );
    }
    }

export const updateProfile = async (userId: string, userData: FormData) => {
    try {
        const token = await getAuthToken();
        const response = await axios.put(
            API.AUTH.UPDATE_PROFILE.replace(":id", userId),
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (err: Error | any) {
        throw new Error(
            err.response?.data?.message || 
            err.message || 
            "Failed to update profile"
        );
    }
};



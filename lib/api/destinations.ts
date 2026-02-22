import axiosInstance from "./axios";

export const getPublicDestinations = async () => {
  try {
    const response = await axiosInstance.get("/destinations");
    return response.data;
  } catch (err: Error | any) {
    throw new Error(
      err.response?.data?.message || err.message || "Failed to fetch destinations"
    );
  }
}; 

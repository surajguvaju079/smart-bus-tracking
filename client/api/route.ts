import { BASE_URL } from "@/constants/BaseUrl";
import axios from "axios";

export const Route = {
  show: async (id: number) => {
    console.log("routes with id", id);
    return await axios.get(`${BASE_URL}/routes/${id}`);
  },
  create: async (data: any, trip_id?: number) => {
    return await axios.post(`${BASE_URL}/routes/full`, data);
  },
};

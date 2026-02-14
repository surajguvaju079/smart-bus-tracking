import { BASE_URL } from "@/constants/BaseUrl";
import { CreateDriverType } from "@/schema/createDriver";
import axios from "axios";

export const driver = {
  create: async (data: CreateDriverType) => {
    return await axios.post(`${BASE_URL}/drivers`, data);
  },
  getAll: async () => {
    return await axios.get(`${BASE_URL}/drivers`);
  },
};

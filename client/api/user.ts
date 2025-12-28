import axios from "axios";
import { BASE_URL } from "@/constants/BaseUrl";

interface RegisterUserProps {
  name: string;
  email: string;
  password: string;
}

export const User = {
  register: async (data: RegisterUserProps) => {
    return axios.post(`${BASE_URL}/users`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },

  showUserById: async (userId: string) => {
    return axios.get(`${BASE_URL}/users/${userId}`, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

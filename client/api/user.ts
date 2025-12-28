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
  show: async (page: number = 1, limit: number = 10) => {
    return axios.get(`${BASE_URL}/users?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

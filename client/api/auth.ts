
import axios from "axios";
import { BASE_URL } from "@/constants/BaseUrl";

interface LoginUserProps {
  email: string;
  password: string;
}

export const Auth = {
  login: async (data: LoginUserProps) => {
    return axios.post(`${BASE_URL}/auth/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

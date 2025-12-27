import { BASE_URL } from "@/constants/BaseUrl";
import axios from "axios";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export const User = {
  create: async (data: CreateUserProps) => {
    return await axios.post(`${BASE_URL}/users/create`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

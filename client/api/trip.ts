import { BASE_URL } from "@/constants/BaseUrl";
import { CreateTripType } from "@/schema/tripSchema";
import axios from "axios";

export const trip = {
  create: async (data: CreateTripType) => {
    return await axios.post(`${BASE_URL}/trips/create`, data);
  },
  getAll: async () => {
    return await axios.get(`${BASE_URL}/trips`);
  },
  getById: async (tripId: string) => {
    return await axios.get(`${BASE_URL}/trips/${tripId}`);
  },
};

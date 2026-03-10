import { BASE_URL } from "@/constants/BaseUrl";
import { CreateTripType } from "@/schema/tripSchema";
import axios from "axios";

export const trip = {
  create: async (data: CreateTripType) => {
    return await axios.post(`${BASE_URL}/trips/create`, data);
  },
  getAll: async (page: number = 1, limit: number = 10) => {
    return await axios.get(`${BASE_URL}/trips?page=${page}&limit=${limit}`);
  },
  getById: async (tripId: string) => {
    return await axios.get(`${BASE_URL}/trips/${tripId}`);
  },

  getByDriver: async (id: number, page: number = 1, limit: number = 10) => {
    return await axios.get(
      `${BASE_URL}/trips/driver/${id}?page=${page}&limit=${limit}`,
    );
  },
};

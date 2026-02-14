import { CreateTripType } from "@/schema/tripSchema";
import axios from "axios";

export const trip = {
  create: async (data: CreateTripType) => {
    return await axios.post("/trips", data);
  },
  getAll: async () => {
    return await axios.get("/trips");
  },
  getById: async (tripId: string) => {
    return await axios.get(`/trips/${tripId}`);
  },
};

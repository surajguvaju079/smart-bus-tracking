import { BASE_URL } from "@/constants/BaseUrl";
import { TripLocationType } from "@/schema/tirpLocationSchema";
import axios from "axios";

export const tripLocation = {
  create: async (data: TripLocationType) => {
    return await axios.post(`${BASE_URL}/trip-locations`, data);
  },
};

import { TripLocationType } from "@/schema/tirpLocationSchema";
import axios from "axios";

export const tripLocation = {
  create: async (data: TripLocationType) => {
    return await axios.post("/trip-locations", data);
  },
};

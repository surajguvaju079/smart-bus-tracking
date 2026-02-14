import { CreateDriverType } from "@/schema/createDriver";
import axios from "axios";

export const driver = {
  create: async (data: CreateDriverType) => {
    return await axios.post("/drivers", data);
  },
  getAll: async () => {
    return await axios.get("/drivers");
  },
};

import { create } from "zustand";
import axios from "axios";

interface TripState {
  loading: boolean;
  activeTrip: any;
  createTrip: (data: any) => Promise<void>;
}

export const useTripStore = create<TripState>((set) => ({
  loading: false,
  activeTrip: null,

  createTrip: async (data) => {
    try {
      set({ loading: true });

      const res = await axios.post(
        "http://192.168.32.90:8080/api/v1/trips",
        data,
      );

      set({ activeTrip: res.data.data });
    } catch (error) {
      console.log("Create trip error", error);
    } finally {
      set({ loading: false });
    }
  },
}));

import { z } from "zod";

export const createTripSchema = z.object({
  start_time: z.string(),
  start_location_name: z
    .string()
    .min(3, "Start location must be atleast 3 letters"),
  start_latitude: z.number(),
  start_longitude: z.number(),
  end_location_name: z
    .string()
    .min(3, "End location must be at least 3 letters"),
  end_latitude: z.number(),
  end_longitude: z.number(),
  end_time: z.string().optional(),
});

export type CreateTripType = z.infer<typeof createTripSchema>;

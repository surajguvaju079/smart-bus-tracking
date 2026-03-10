import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isFirstLogin: boolean;
  profileImage: string;
  phoneNumber: string;
  vehicle_number?: string;
  driver_id?: number;
}

interface UserState {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  _hasHydrated: boolean;

  setUsers: (users: User[]) => void;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;

  setHasHydrated: (state: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      _hasHydrated: false,

      setUsers: (users) => set({ users }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "user-storage", // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

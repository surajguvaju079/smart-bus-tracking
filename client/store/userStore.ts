import { create } from "zustand";

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
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

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
}));

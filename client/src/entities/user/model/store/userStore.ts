import { create } from "zustand";
import { User } from "../../api/types";

type UserState = {
   isAuthenticated: boolean;
   user: User | null;
};

type UserAction = {
    setUser: (user: UserState['user']) => void;
    clearUser: () => void;
    updateUser: (updatedUser: User | undefined) => void;
};

export const useUserStore = create<UserState & UserAction>((set) => ({
    isAuthenticated: false,
    user: null,
    setUser(user: User | null)
    {
        if (!user) {
            set(() => ({isAuthenticated: false, user: null}))
        } else {
            set(() => ({isAuthenticated: true, user}))
        }
    },
    clearUser() {
        set(() => ({isAuthenticated: false, user: null}))
    },
    updateUser(updatedUser: User | undefined) {
        set((state) => ({
            user: state.user ? { ...state.user, ...updatedUser } : null
        }))
    }
})) 
import { create } from "zustand";
import axios from "axios";

interface User {
    id: string;
    fullname: string;
    email: string;
    role: string;
    pic: string;
}

interface AuthStore {
    user: User | null;
    loading: boolean,
    setUser: (user: User | null) => void;
    register: (data: {
        fullname: string;
        email: string;
        password: string;
        pic?: string;
        code?: string;
    }) => Promise<void>;
    login: (data: { email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: true,


    setUser: (user) => set({ user }),

    register: async (data) => {
        try {
            const res = await axios.post("/api/signup", data);
            const user = res.data.user;
            set({ user });
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        }
    },

    login: async (data) => {
        try {
            const res = await axios.post("/api/signin", data);
            const user = res.data.user;
            set({ user });
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await axios.post("/api/logout");
            set({ user: null });
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    },

    fetchUser: async () => {
        set({ loading: true })
        try {
            const res = await axios.get("/api/me");
            const user = res.data.user;
            set({ user });
        } catch {
            set({ user: null });
        }
    },
}));

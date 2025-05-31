import { create } from "zustand"

import axios from "axios"

interface User {
    id: string,
    fullname: string,
    email: string,
    role: string,
    pic: string
}


interface AuthStore {
    user: User | null;
    setUser: (user: User | null) => void;
    register: (data: {
        fullName: string;
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
    setUser((user)=> set({ user })),

register: async (data) => {
    try {
        const res = await axios.post('/api/signup', data)
        const user = res.data.user
        set({ user })
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
}

}))

import { create } from "zustand"

import axios from "axios"

interface User {
    id: string,
    fullname: string,
    email: string,
    role: string,
    pic: string
}

export const useAuthStore = create((set) => ({
    user: User,

}))

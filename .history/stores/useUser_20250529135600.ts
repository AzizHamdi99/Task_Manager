import { create } from "zustand"

import axios from "axios"

interface User {
    id: string,
    fullname: string:
    elail
}

export const useAuthStore = create((set) => ({
    user: IUser,

}))

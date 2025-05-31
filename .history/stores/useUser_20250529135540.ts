import { create } from "zustand"

import axios from "axios"

interface user

export const useAuthStore = create((set) => ({
    user: IUser,

}))

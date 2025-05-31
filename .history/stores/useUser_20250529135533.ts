import { create } from "zustand"

import axios from "axios"



export const useAuthStore = create((set) => ({
    user: IUser,

}))

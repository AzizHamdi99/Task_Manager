import { create } from "zustand"

import axios from "axios"

interface User {

}

export const useAuthStore = create((set) => ({
    user: IUser,

}))

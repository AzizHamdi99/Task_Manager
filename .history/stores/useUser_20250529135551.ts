import { create } from "zustand"

import axios from "axios"

interface User {
    id: string,

}

export const useAuthStore = create((set) => ({
    user: IUser,

}))

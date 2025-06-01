import { create } from "zustand";
import axios from "axios";
import { PriorityCounts, StatusCounts, Task, User } from "@/types/types";





interface TaskStore {
    tasks: Task[] | null
    users: User[] | null
    loading: boolean,
    statusCounts: StatusCounts;
    priorityCounts: PriorityCounts;
    addTask: (data: Omit<Task, "progress"> & { progress?: number }) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    getTasks: (data: { userId: string }) => Promise<void>;
    getUsers: () => Promise<void>

}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: null,
    loading: true,
    statusCounts: { pending: 0, inProgress: 0, completed: 0 },
    statusCounts: { low: 0, meduim: 0, high: 0 },
    users: null,

    addTask: async (data) => {
        try {
            set({ loading: true })
            await axios.post('/api/addTask', data)
            set({ loading: false })
        } catch (error) {
            console.error("Error adding task:", error);
            set({ loading: false });

        }

    },
    deleteTask: async (taskId) => {

        try {
            set({ loading: true })
            await axios.post(`/api/deletetask/${taskId}`)
            set((state) => ({
                tasks: state.tasks?.filter((task) => task.id !== taskId) || [],
                loading: false,
            }));

        } catch (error) {
            console.error("Error deleting task:", error);
            set({ loading: false });

        }

    },
    getTasks: async (userId) => {

        try {
            set({ loading: false })
            const res = await axios.get(`/api/tasks/${userId}`)
            const { tasks, counts } = res.data
            set({ tasks, loading: false, statusCounts: counts.status, priorityCounts: counts.priority })
        } catch (error) {
            console.error("Error fetching tasks:", error);
            set({ loading: false });

        }

    },
    getUsers: async () => {
        try {
            set({ loading: true })
            const res = await axios.get("/api/getusers")
            set({ users: res.data })
            set({ loading: false })

        } catch (error) {
            console.error("Error fetching Users:", error);
            set({ loading: false });

        }

    }








}));

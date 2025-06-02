import { create } from "zustand";
import axios from "axios";
import { PriorityCounts, StatusCounts, Task, User } from "@/types/types";





interface TaskStore {
    tasks: Task[] | null
    users: User[] | null,
    task: Task | null
    loading: boolean,
    statusCounts: StatusCounts;
    priorityCounts: PriorityCounts;
    addTask: (data: {
        dueDate?: string;
        todoCheckList: { text: string; completed: boolean }[];
        attachments: string[];
        assignedTo: string[];
        title: string;
        description: string;
        priority: string;
        createdBy: string;
    }) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    getTasks: (data: { userId: string }) => Promise<void>;
    getUsers: () => Promise<void>
    getTask: (taskId: string) => Promise<void>
    updateTask: (taskId: string, data: {
        dueDate?: string;
        todoCheckList: { text: string; completed: boolean }[];
        attachments: string[];
        assignedTo: string[];
        title: string;
        description: string;
        priority: string;
        createdBy: string;
    }) => Promise<void>;

}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: null,
    loading: true,
    task: null,
    statusCounts: { pending: 0, inProgress: 0, completed: 0 },
    priorityCounts: { low: 0, meduim: 0, high: 0 },
    users: null,

    addTask: async (data) => {
        try {
            set({ loading: true });

            const res = await axios.post("/api/addTask", data);
            const newTask: Task = res.data.task;

            set((state) => {
                const updatedTasks = state.tasks ? [...state.tasks, newTask] : [newTask];

                const updatedStatusCounts = { ...state.statusCounts };
                updatedStatusCounts[newTask.status as keyof StatusCounts]++;

                const updatedPriorityCounts = { ...state.priorityCounts };
                updatedPriorityCounts[newTask.priority as keyof PriorityCounts]++;

                return {
                    tasks: updatedTasks,
                    statusCounts: updatedStatusCounts,
                    priorityCounts: updatedPriorityCounts,
                    loading: false,
                };
            });
        } catch (error) {
            console.error("Error adding task:", error);
            set({ loading: false });
        }
    },


    deleteTask: async (taskId) => {
        try {
            set({ loading: true });

            // Optional: Find the task before deleting so we know its status/priority
            const taskToDelete = useTaskStore.getState().tasks?.find((t) => t.id === taskId);

            await axios.post(`/api/deletetask/${taskId}`);

            set((state) => {
                const updatedTasks = state.tasks?.filter((task) => task.id !== taskId) || [];

                const updatedStatusCounts = { ...state.statusCounts };
                const updatedPriorityCounts = { ...state.priorityCounts };

                if (taskToDelete) {
                    updatedStatusCounts[taskToDelete.status as keyof StatusCounts]--;
                    updatedPriorityCounts[taskToDelete.priority as keyof PriorityCounts]--;
                }

                return {
                    tasks: updatedTasks,
                    statusCounts: updatedStatusCounts,
                    priorityCounts: updatedPriorityCounts,
                    loading: false,
                };
            });
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

    },
    getTask: async (taskId) => {
        try {
            set({ loading: true })
            const res = await axios.get(`/api/getTask/${taskId}`)
            set({ task: res.data, loading: false })
        } catch (error) {
            console.error("Error geting task:", error);
            set({ loading: false });

        }

    },
    updateTask: async (taskId, data) => {

        try {
            set({ loading: false })
            await axios.put(`/api/updateTask/${taskId}`)
            set({ loading: false })


        } catch (error) {
            console.error("Error geting task:", error);
            set({ loading: false });

        }

    }








}));

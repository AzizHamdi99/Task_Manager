import { create } from "zustand";
import axios from "axios";
export interface todo {
    text: string;
    completed: boolean
}
export interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: Date;
    assignedTo: string[];
    createdBy: string[];
    attachments: string[];
    todoCheckList: todo;
    progress: number, createdAt: Date


}

interface StatusCounts {
    pending: number;
    inProgress: number;
    completed: number;
}

interface PriorityCounts {
    low: number;
    meduim: number;
    high: number;
}
interface TaskStore {
    tasks: Task[] | null
    loading: boolean,
    statusCounts: StatusCounts;
    priorityCounts: PriorityCounts;
    addTask: (data: Omit<Task, "progress"> & { progress?: number }) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    getTasks: (data: { userId: string }) => Promise<void>;

}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: null,
    loading: true,
    statusCounts: { pending: 0, inProgress: 0, completed: 0 },
    priorityCounts: { low: 0, meduim: 0, high: 0 },

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

    }








}));

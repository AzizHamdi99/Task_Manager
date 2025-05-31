import { create } from "zustand";
import axios from "axios";
interface todo {
    text: string;
    completed: boolean
}
interface Task {
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
    progress: number


}

interface TaskStore {
    tasks: Task[] | null
    loading: boolean,
    addTask: (data: Omit<Task, "progress"> & { progress?: number }) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    getTasks: (data: { taskId: string }) => Promise<void>;

}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    loading: true,

    addTask=async (data) => {
        try {
            cons
        } catch (error) {

        }

    },
    deleteTask=async (taskId) => {

    },
    getTasks=async (taskId) => {

    }








}));

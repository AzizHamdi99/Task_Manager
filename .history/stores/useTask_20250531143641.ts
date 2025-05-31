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
    assignedTo: [string];
    createdBy: [string];
    attachments: [string];
    todoCheckList: todo;
    progress: number


}

interface TaskStore {
    tasks: Task[] | null
    loading: boolean,
    //setUser: (user: User | null) => void;
    addTask: (data: {
        id: string;
        title: string;
        description: string;
        priority?: string;
        status: string;
        dueDate: Date;
        assignedTo: string[];
        createdBy: string[];
        attachments?: string[];
        todoCheckList?: todo[];

    }) => Promise<void>;
    deleteTask: (data: { taskId: string }) => Promise<void>;
    getTasks: (data: { taskId: string }) => Promise<void>;

}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    loading: true,




}));

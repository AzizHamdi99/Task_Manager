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
    progress: number,
    createdAt: Date


}
export interface StatusCounts {
    pending: number;
    inProgress: number;
    completed: number;
}

export interface PriorityCounts {
    low: number;
    meduim: number;
    high: number;
}

export interface User {
    userId: string,
    email: string,
    name: string,
    pic: string,
    taskCounts: StatusCounts
}

export type Status = "Pending" | "In Progress" | "Completed";
export type Priority = "Low" | "Meduim" | "High";
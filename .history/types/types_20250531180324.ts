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
    progress: number


}
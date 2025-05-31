
import React from 'react'
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


function RecentTask({ tasks }: { tasks: Task[] }) {

    const sortedTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);
    console.log(sortedTasks)



    return (
        <div>

        </div>
    )
}

export default RecentTask

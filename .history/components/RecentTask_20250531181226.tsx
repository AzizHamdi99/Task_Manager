import { Task } from '@/stores/useTask'
import React from 'react'

function RecentTask({ tasks }: { tasks: Task[] }) {


    console.log("Received tasks:", tasks);
    console.log("Type check:", Array.isArray(tasks), typeof tasks);

    if (!Array.isArray(tasks)) {
        throw new Error("tasks is not an array at runtime");
    }
    const sortedTasks = [...tasks].reverse()

    console.log(tasks)
    return (
        <div>

        </div>
    )
}

export default RecentTask

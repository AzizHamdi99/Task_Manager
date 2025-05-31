import { Task } from '@/stores/useTask'
import React from 'react'

function RecentTask({ tasks }: { tasks: Task[] }) {
    const sortedTasks = [...tasks].reverse()
    console.log(tasks)
    console.log(sortedTasks)
    return (
        <div>

        </div>
    )
}

export default RecentTask

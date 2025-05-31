
import { Task } from '@/stores/useTask';
import React from 'react'



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


import { Task } from '@/stores/useTask';
import Link from 'next/link'

import React from 'react'



function RecentTask({ tasks }: { tasks: Task[] }) {

    const sortedTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);
    console.log(sortedTasks)



    return (
        <div>
            <div>
                <p>Recent Tasks</p>
                <Link href={"/dashboard/tasks"}>
                    <div >
                        <p>See All</p>


                    </div>

                </Link>

            </div>


        </div>
    )
}

export default RecentTask

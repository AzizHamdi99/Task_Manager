
import { Task } from '@/stores/useTask';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'

import React from 'react'



function RecentTask({ tasks }: { tasks: Task[] }) {

    const sortedTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);
    console.log(sortedTasks)



    return (
        <div>
            <div className='flex items-center justify-between'>
                <p>Recent Tasks</p>
                <Link href={"/dashboard/tasks"}>
                    <div >
                        <p>See All</p>
                        <ArrowRight />

                    </div>

                </Link>

            </div>


        </div>
    )
}

export default RecentTask

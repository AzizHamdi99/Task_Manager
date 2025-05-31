
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
        <div className='p-6 bg-white'>
            <div className='flex items-center justify-between'>
                <p>Recent Tasks</p>
                <Link href={"/dashboard/tasks"}>
                    <div className='flex gap-1'>
                        <p>See All</p>
                        <ArrowRight />

                    </div>

                </Link>

            </div>
            <div>
                <div>
                    <p>Name</p>
                    <p>Status</p>
                    <p>Priority</p>
                    <p>Created On</p>
                </div>
                <div>
                    {sortedTasks.map((t) => (
                        <div>
                            <hr />
                            <div>
                                <p></p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default RecentTask

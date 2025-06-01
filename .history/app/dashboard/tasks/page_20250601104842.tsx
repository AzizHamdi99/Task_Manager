"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

function tasks() {
    const { getTasks, tasks, statusCounts, priorityCounts } = useTaskStore()
    const { user } = useAuthStore()


    useEffect(() => {
        getTasks(user?._id)
    }, [])
    console.log(tasks)
    return (
        <div className='p-6'>
            <div className='flex items-center justify-between '>
                <p className='text-2xl font-semibold text-[#282828]'>My Tasks</p>
                <div className='flex items-center gap-4'>
                    <div>
                        <p>All <span>{tasks?.length}</span></p>
                    </div>
                    <div>
                        <p>Pending <span>{statusCounts?.pending}</span></p>
                    </div>
                    <div>
                        <p>In Progress <span>{statusCounts?.inProgress}</span></p>
                    </div>
                    <div>
                        <p>Completed <span>{statusCounts?.completed}</span></p>
                    </div>


                </div>

            </div>



        </div>
    )
}

export default tasks

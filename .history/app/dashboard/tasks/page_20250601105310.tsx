"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect, useState } from 'react'

function tasks() {
    const { getTasks, tasks, statusCounts, priorityCounts } = useTaskStore()
    const { user } = useAuthStore()


    useEffect(() => {
        getTasks(user?._id)
    }, [])
    console.log(tasks)
    const [selected, setSelected] = useState('All')
    return (
        <div className='p-6'>
            <div className='flex items-center justify-between '>
                <p className='text-2xl font-semibold text-[#282828]'>My Tasks</p>
                <div className='flex items-center gap-4'>
                    <div onClick={() => setSelected("All")} className={selected === "All" ? "text-[#155be8]"}>
                        <p>All <span className='mx-1 p-1'>{tasks?.length}</span></p>
                    </div>
                    <div onClick={() => setSelected("Pending")}>
                        <p>Pending <span>{statusCounts?.pending}</span></p>
                    </div>
                    <div onClick={() => setSelected("In progress")}>
                        <p>In Progress <span>{statusCounts?.inProgress}</span></p>
                    </div>
                    <div onClick={() => setSelected("Completed")}>
                        <p>Completed <span>{statusCounts?.completed}</span></p>
                    </div>


                </div>

            </div>



        </div>
    )
}

export default tasks

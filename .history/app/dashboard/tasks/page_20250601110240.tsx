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
                <div className='flex items-center gap-4 font-semibold'>
                    <div onClick={() => setSelected("All")} className={selected === "All" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>All <span className={selected === "All" ? "bg-[#155be8] rounded-full text-white px-2" : "rounded-full bg-[#e8e7ea] px-2"}>{tasks?.length}</span></p>
                    </div>
                    <div onClick={() => setSelected("Pending")} className={selected === "Pending" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>Pending <span>{statusCounts?.pending}</span></p>
                    </div>
                    <div onClick={() => setSelected("In Progress")} className={selected === "In Progress" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>In Progress <span>{statusCounts?.inProgress}</span></p>
                    </div>
                    <div onClick={() => setSelected("Completed")} className={selected === "Completed" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>Completed <span>{statusCounts?.completed}</span></p>
                    </div>


                </div>

            </div>



        </div>
    )
}

export default tasks

"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect, useState } from 'react'

function tasks() {
    const { getTasks, tasks, statusCounts, priorityCounts, users, getUsers } = useTaskStore()
    const { user } = useAuthStore()


    useEffect(() => {
        getTasks(user?._id)


    }, [])
    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)
    const [selected, setSelected] = useState('All')
    return (
        <div className='p-6 flex flex-col gap-4'>
            <div className='flex items-center justify-between '>
                <p className='text-2xl font-semibold text-[#282828]'>My Tasks</p>
                <div className='flex items-center gap-4 font-semibold'>
                    <div onClick={() => setSelected("All")} className={selected === "All" ? "text-[#155be8] px-3 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-3 py-1 text-[#706f71] cursor-pointer"}>
                        <p>All <span className={selected === "All" ? "bg-[#155be8] rounded-full text-white px-2" : "rounded-full bg-[#e8e7ea] px-2"}>{tasks?.length}</span></p>
                    </div>
                    <div onClick={() => setSelected("Pending")} className={selected === "Pending" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>Pending <span className={selected === "Pending" ? "bg-[#155be8] rounded-full text-white px-2" : "rounded-full bg-[#e8e7ea] px-2"}>{statusCounts?.pending}</span></p>
                    </div>
                    <div onClick={() => setSelected("In Progress")} className={selected === "In Progress" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>In Progress <span className={selected === "In Progress" ? "bg-[#155be8] rounded-full text-white px-2" : "rounded-full bg-[#e8e7ea] px-2"}>{statusCounts?.inProgress}</span></p>
                    </div>
                    <div onClick={() => setSelected("Completed")} className={selected === "Completed" ? "text-[#155be8] px-2 py-1 border-b-[3px] border-b-[#155be8] cursor-pointer" : " px-2 py-1 text-[#706f71] cursor-pointer"}>
                        <p>Completed <span className={selected === "Completed" ? "bg-[#155be8] rounded-full text-white px-2" : "rounded-full bg-[#e8e7ea] px-2"}>{statusCounts?.completed}</span></p>
                    </div>


                </div>


            </div>
            <div>
                {tasks?.map((task, i) => {
                    const assignedUser = users?.filter((u) => task.assignedTo.includes(u.userId))
                    console.log(assignedUser)
                    return (
                        <div key={i}>
                            <div>
                                <p>{task.status}</p>
                                <p>{task.priority} Priority</p>
                            </div>
                            <div>


                                <p>{task.title}</p>
                                <p>{task.description}</p>

                            </div>
                        </div>

                    )

                })}

            </div>



        </div>
    )
}

export default tasks

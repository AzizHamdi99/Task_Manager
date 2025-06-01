"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import { createdDate } from '@/utils/date'
import Image from 'next/image'
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


    const filteredTasks =
        selected === "All"
            ? tasks
            : tasks?.filter((task) => task.status === selected);




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
            <div className='grid grid-cols-3 gap-4 items-center'>
                {filteredTasks?.map((task, i) => {
                    const assignedUser = users?.filter((u) => task.assignedTo.includes(u.userId))
                    console.log(assignedUser)
                    return (
                        <div key={i} className='bg-white p-4 shadow-md rounded-md'>
                            <div className='flex gap-4 items-center'>
                                <p className={task?.status === "Pending" ? "bg-[#f2e3fb] text-[#8749bd] text-sm p-1 max-w-fit px-3 rounded-md" : task?.status === "In Progress" ? "bg-blue-300 text-blue-500 text-sm p-1 max-w-fit px-3 rounded-md" : "bg-[#c1e9d1] text-[#66af7d] text-sm p-1 max-w-fit px-3 rounded-md"}>{task?.status}</p>
                                <p className={task?.priority === "High" ? "bg-[#fcdce0] text-[#d16f7b] text-sm p-1 max-w-fit px-3 rounded-md" : task?.priority === "Meduim" ? "bg-[#fae3c5] text-[#e87d1a] text-sm p-1 max-w-fit px-3 rounded-md" : "bg-[#c1e9d1] text-[#66af7d] text-sm p-1 max-w-fit px-3 rounded-md"}>{task?.priority} Priority</p>
                            </div>
                            <div>


                                <p>{task?.title}</p>
                                <p>{task?.description}</p>
                                <p>Task Done: <span>{task.progress}/{task?.todoCheckList?.length}</span></p>
                                <div className='h-2 bg-gray-600'></div>


                            </div>
                            <div>
                                <div>
                                    <p>Start Date</p>
                                    <p>{createdDate(new Date(task.createdAt))}</p>

                                </div>
                                <div>
                                    <p>Due Date</p>
                                    <p>{createdDate(new Date(task?.dueDate))}</p>

                                </div>
                            </div>
                            <div>
                                <div className="flex -space-x-4">
                                    {assignedUser?.map((u, key) => (
                                        <Image className='rounded-full border-2 border-white' key={key} height={40} width={40} alt='pdp' src={u?.pic || "/nppdp.webp"} />
                                    ))}

                                </div>

                            </div>
                        </div>

                    )

                })}

            </div>



        </div>
    )
}

export default tasks

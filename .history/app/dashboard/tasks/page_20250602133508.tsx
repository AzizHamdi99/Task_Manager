"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import { createdDate } from '@/utils/date'
import { CircularProgress } from '@mui/material'
import { Link, Paperclip } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


function Tasks() {
    const { getTasks, tasks, statusCounts, priorityCounts, users, getUsers, loading } = useTaskStore()
    const { user } = useAuthStore()
    const router = useRouter()
    const [selected, setSelected] = useState('All')

    useEffect(() => {
        getTasks(user?._id)


    }, [])
    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)



    const filteredTasks =
        selected === "All"
            ? tasks
            : tasks?.filter((task) => task.status === selected);


    if (loading) {
        return (
            <div className="w-4/5 h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }




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
            <div className='grid grid-cols-3 gap-4 items-center '>
                {filteredTasks?.length > 0
                filteredTasks?.map((task, i) => {
                    const assignedUser = users?.filter((u) => task.assignedTo.includes(u.userId))
                const percentage = Math.round((task.progress / task.todoCheckList?.length) * 100);
                    // console.log(assignedUser)
                    const handleClick = () => {
                        if (user?.role === "ADMIN") {
                    router.push(`/dashboard/updateTask/${task._id}`);
                        } else {
                    router.push(`/dashboard/task/${task._id}`);
                        }
                    };
                return (

                <div onClick={handleClick} key={i} className='bg-white p-4 shadow-md rounded-md flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all duration-300'>
                    <div className='flex gap-4 items-center'>
                        <p className={task?.status === "Pending" ? "bg-[#f2e3fb] text-[#8749bd] text-sm p-1 max-w-fit px-3 rounded-md" : task?.status === "In Progress" ? "bg-blue-300 text-blue-500 text-sm p-1 max-w-fit px-3 rounded-md" : "bg-[#c7f8da] text-[#448b5b] text-sm p-1 max-w-fit px-3 rounded-md"}>{task?.status}</p>
                        <p className={task?.priority === "High" ? "bg-[#fcdce0] text-[#d16f7b] text-sm p-1 max-w-fit px-3 rounded-md" : task?.priority === "Meduim" ? "bg-[#fae3c5] text-[#e87d1a] text-sm p-1 max-w-fit px-3 rounded-md" : "bg-[#c7f8da] text-[#448b5b] text-sm p-1 max-w-fit px-3 rounded-md"}>{task?.priority} Priority</p>
                    </div>
                    <div className='mt-1 flex flex-col gap-1'>


                        <p className='font-semibold text-[#3c3c3d]'>{task?.title}</p>
                        <p className='text-sm text-[#96969a] font-medium'>{task?.description}</p>
                        <p className='text-[15px] text-[#46454c] font-medium'>Task Done: <span className='text-[#515052] font-semibold'>{task.progress}/{task?.todoCheckList?.length}</span></p>
                        <div className="w-full">
                            <div className="flex justify-between mb-1">
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-[#00afda] h-2.5 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                >

                                </div>
                            </div>
                        </div>


                    </div>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-[15px] text-[#46454c] font-medium'>Start Date</p>
                            <p className='text-[#515052] font-semibold'>{createdDate(new Date(task.createdAt))}</p>

                        </div>
                        <div>
                            <p className='text-[15px] text-[#46454c] font-medium'>Due Date</p>
                            <p className='text-[#515052] font-bold'>{createdDate(new Date(task?.dueDate))}</p>

                        </div>
                    </div>
                    <div className='flex items-center justify-between '>
                        <div className="flex -space-x-4">
                            {assignedUser?.slice(0, 3).map((u, key) => (

                                <Image className='rounded-full border-2 border-white' key={key} height={40} width={40} alt='pdp' src={u?.pic || "/nppdp.webp"} />


                            ))}
                            {assignedUser?.length > 3 && <div className='bg-gray-200 text-center items-center px-3 py-1 rounded-full font-semibold'>+{assignedUser?.length - 3}</div>}

                        </div>
                        {task.attachments.length > 0 && <div className='flex items-center gap-2 px-2 py-1 bg-[#eaf4f8] rounded-md'>
                            <Paperclip className='text-blue-500' size={20} />
                            <p className='text-[#515052] font-bold'>{task.attachments.length}</p>

                        </div>}


                    </div>
                </div>


                )

                })}

            </div>



        </div>
    )
}

export default Tasks

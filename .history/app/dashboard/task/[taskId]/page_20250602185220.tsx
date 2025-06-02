"use client"
import { useTaskStore } from '@/stores/useTask'
import { createdDate } from '@/utils/date'
import { Avatar, CircularProgress } from '@mui/material'
import { ExternalLink } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const params = useParams()
    const taskId = params.taskId
    const { task, getTask, users, getUsers, loading } = useTaskStore()

    useEffect(() => {
        getTask(taskId as string)
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    if (loading) {
        return (
            <div className=" h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }


    return (
        <div className='flex flex-col gap-3 m-6 bg-white rounded-xl p-6 w-4xl shadow-md'>
            <div className='flex justify-between items-center' >
                <p className='text-2xl font-semibold text-[#2b2b2b]'> {task?.title}</p>
                <p >{task?.status}</p>
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-[#696a73] font-semibold text-md'>Description</p>
                <p className='font-meduim text-[#2b2b2b] font-semibold '>{task?.description}</p>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-1'>
                    <p className='text-[#696a73] font-semibold text-md'>Priority</p>
                    <p className='font-meduim text-[#2b2b2b] font-semibold '>{task?.priority}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-[#696a73] font-semibold text-md'>dueDate</p>
                    <p className='font-meduim text-[#2b2b2b] font-semibold' >{createdDate(new Date(task?.dueDate))}</p>
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-[#696a73] font-semibold text-md'>Assigned To</p>
                    <div className="flex -space-x-4">
                        {task?.assignedTo?.map((userId: string) => {
                            const user = users?.find(u => u.userId === userId)
                            return user ? (
                                <Avatar key={userId} alt={user.name} src={user.pic || "/nppdp.webp"} />
                            ) : null
                        })}
                    </div>
                </div>

            </div>
            <div className='flex flex-col gap-3'>
                <p className='text-[#696a73] font-semibold text-md'>Todo Checklist</p>
                <div className='flex flex-col gap-2'>
                    {task?.todoCheckList.map((t, i) => (
                        <div key={i} className='flex items-center gap-3 font-semibold'>
                            <input className='w-4 h-4 cursor-pointer' type="checkbox" />
                            <p className='font-meduim text-[#2b2b2b]  '>{t.text}</p>
                        </div>
                    ))}
                </div>

            </div>
            {task?.attachments && task.attachments.length > 0 &&
                <div className='flex flex-col gap-2'>
                    <p className='text-[#696a73] font-semibold text-md'>Attachments</p>
                    <div>
                        {task.attachments.map((att, i) => (
                            <a className='flex items-center justify-between' href={att} target='blank'>
                                <div key={i} className='font-semibold flex gap-3 items-center'>
                                    <span>{i + 1}</span>
                                    <p className='font-meduim text-[#2b2b2b] '>{att}</p>
                                </div>
                                <ExternalLink size={20} />
                            </a>
                        ))}

                    </div>


                </div>}



        </div>
    )
}

export default page

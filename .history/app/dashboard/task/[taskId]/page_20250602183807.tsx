"use client"
import { useTaskStore } from '@/stores/useTask'
import { Avatar, CircularProgress } from '@mui/material'
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
            <div className=''>
                <p className='text-[#696a73] font-semibold text-sm'>Description</p>
                <p className='font-meduim text-[#0e0e0e] '>{task?.description}</p>
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-[#696a73] font-semibold text-sm'>Priority</p>
                    <p className='font-meduim text-[#0e0e0e] '>{task?.priority}</p>
                </div>
                <div>
                    <p className='text-[#696a73] font-semibold text-sm'>dueDate</p>
                    <p className='font-meduim text-[#0e0e0e] ' >{task?.dueDate}</p>
                </div>
                <div>
                    <p className='text-[#696a73] font-semibold text-sm'>Assigned To</p>
                    <div>
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
                <p className='text-[#696a73] font-semibold text-sm'>Todo Checklist</p>
                <div className='flex flex-col gap-2'>
                    {task?.todoCheckList.map((t, i) => (
                        <div key={i} className='flex items-center gap-3'>
                            <input type="checkbox" />
                            <p className='font-meduim text-[#0e0e0e] '>{t.text}</p>
                        </div>
                    ))}
                </div>

            </div>
            {task?.attachments && task.attachments.length > 0 &&
                <div>
                    <p className='text-[#696a73] font-semibold text-sm'>Attachments</p>
                    <div>
                        {task.attachments.map((att, i) => (
                            <div key={i}>
                                <span>{i + 1}</span>
                                <a href={att} target='blank' className='font-meduim text-[#0e0e0e] '>{att}</a>
                            </div>
                        ))}

                    </div>


                </div>}



        </div>
    )
}

export default page

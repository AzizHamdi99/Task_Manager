"use client"
import { useTaskStore } from '@/stores/useTask'
import { CircularProgress } from '@mui/material'
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
            <div className=" w-full h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }


    return (
        <div>
            <div> <p> {task?.title}</p>
                <p>{task?.status}</p>
            </div>
            <div>
                <p>Description</p>
                <p>{task?.description}</p>
            </div>
            <div>
                <div>
                    <p>Priority</p>
                    <p>{task?.priority}</p>
                </div>
                <div>
                    <p>dueDate</p>
                    <p>{task?.priority}</p>
                </div>

            </div>


        </div>
    )
}

export default page

"use client"
import { useTaskStore } from '@/stores/useTask'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const params = useParams()
    const taskId = params.taskId
    const { task, getTask, users, getUsers } = useTaskStore()

    useEffect(() => {
        getTask(taskId as string)
    }, [task])

    useEffect(() => {
        getUsers()
    }, [])



    return (
        <div>
            <p> {task?.title}</p>
            di


        </div>
    )
}

export default page

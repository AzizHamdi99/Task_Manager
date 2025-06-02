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
            <div> <p> {task?.title}</p>
                <p>{task?.status}</p>
            </div>
            <div>
                <p>Description</p>
                <p>{task?.description}</p>
            </div>
            <div>

            </div>


        </div>
    )
}

export default page

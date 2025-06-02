"use client"
import { useTaskStore } from '@/stores/useTask'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
    const params = useParams()
    const taskId = params.taskId
    const { task, getTask } = useTaskStore()

    useEffect(() => {
        getTask(taskId as string)
    }, [task])



    return (
        <div>

        </div>
    )
}

export default page

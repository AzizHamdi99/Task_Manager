"use client"
import { useTaskStore } from '@/stores/useTask'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const updatePage = () => {

    const params = useParams()
    const taskId = params.taskId
    const { task, getTask } = useTaskStore()

    useEffect(() => {
        getTask(taskId)
    }, [])

    console.log(task)
    return (
        <div>

        </div>
    )
}

export default updatePage

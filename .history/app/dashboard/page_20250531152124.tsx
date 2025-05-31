"use client"

import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'

import React, { useEffect } from 'react'

const dashboard = () => {
    const { tasks, getTasks, loading, priorityCounts, statusCounts } = useTaskStore()
    const { user } = useAuthStore()
    useEffect(() => {
        getTasks(user!._id)

    }, [])
    console.log(tasks, priorityCounts, statusCounts)


    return (
        <div>



        </div>
    )
}

export default dashboard

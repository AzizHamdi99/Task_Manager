"use client"

import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import { console } from 'inspector'
import React, { useEffect } from 'react'

const dashboard = () => {
    const { tasks, getTasks, loading } = useTaskStore()
    const { user } = useAuthStore()
    console.log(user!._id)
    useEffect(() => {
        getTasks(user!._id)

    }, [])
    console.log(tasks)


    return (
        <div>



        </div>
    )
}

export default dashboard

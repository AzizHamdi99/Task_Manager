"use client"

import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

const dashboard = () => {
    const { tasks, getTasks, loading } = useTaskStore()
    const { user } = useAuthStore()
    console.log(user)
    useEffect(() => {

    }, [])


    return (
        <div>



        </div>
    )
}

export default dashboard

"use client"

import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'

import React, { useEffect } from 'react'

const dashboard = () => {
    const { tasks, getTasks, loading, priorityCounts, statusCounts } = useTaskStore()
    const { user } = useAuthStore()
    useEffect(() => {
        if (!user || !user._id) return;

        getTasks(user._id);
    }, [user]);
    console.log(tasks, priorityCounts, statusCounts)


    return (
        <div>
            <div>
                <p>Good Morning! <span>{user?.fullname}</span></p>

            </div>




        </div>
    )
}

export default dashboard

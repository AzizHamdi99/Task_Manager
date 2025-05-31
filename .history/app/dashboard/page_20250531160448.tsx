"use client"

import Welcome from '@/components/welcome'
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import { formatCustomDate } from '@/utils/date'

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
        <div className=''>
            <Welcome />





        </div>
    )
}

export default dashboard

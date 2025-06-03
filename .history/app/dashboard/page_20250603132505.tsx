"use client"

import RecentTask from '@/components/RecentTask'
import StatusBarChart from '@/components/StatusBarChart'
import StatusPieChart from '@/components/StatusPieChart'
import Welcome from '@/components/Welcome'
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import { formatCustomDate } from '@/utils/date'

import React, { useEffect } from 'react'

const dashboard = () => {
    const { tasks, getTasks, loading, priorityCounts, statusCounts } = useTaskStore()
    const { user, loading } = useAuthStore()
    useEffect(() => {
        if (!user || !user._id) return;

        getTasks(user._id);
    }, [user]);
    console.log(tasks, priorityCounts, statusCounts)



    return (
        <div className='m-5 flex flex-col gap-6'>
            <Welcome />
            <div className='flex gap-10'>
                <StatusPieChart statusData={statusCounts} />
                <StatusBarChart PriorityData={priorityCounts} />
            </div>
            <RecentTask tasks={tasks ?? []} />





        </div>
    )
}

export default dashboard

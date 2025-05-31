"use client"

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
    const currentDate = formatCustomDate()


    return (
        <div className=''>
            <div className='m-4 bg-white p-6'>
                <p className='font-bold text-3xl text-[#434343]'>Good Morning! <span>{user?.fullname}</span></p>
                <p className='text-[#b8babc] font-normal'>{currentDate}</p>
                <div>
                    <div>
                        <div></div>
                        <p>{tasks?.length} Total Tasks</p>
                    </div>
                    <div>
                        <div></div>
                        <p>{statusCounts.pending} Pending Tasks</p>
                    </div>
                    <div>
                        <div></div>
                        <p>{statusCounts.inProgress} In Progress Tasks</p>
                    </div>
                    <div>
                        <div></div>
                        <p>{statusCounts.completed} Completed Tasks</p>
                    </div>

                </div>

            </div>




        </div>
    )
}

export default dashboard

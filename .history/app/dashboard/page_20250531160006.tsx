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
            <div className='m-4 bg-white p-6 flex flex-col gap-2'>
                <p className='font-bold text-3xl text-[#434343]'>Good Morning! <span>{user?.fullname}</span></p>
                <p className='text-[#b8babc] font-normal'>{currentDate}</p>
                <div className='flex items-center justify-between mt-1'>
                    <div className='flex gap-2 items-center'>
                        <div className='w-2 rounded-full h-5 bg-[#115bea]'></div>
                        <p> <span className='text-[#1e1e1e] font-bold text-xl'>{tasks?.length} </span> Total Tasks</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-[#7945f9] w-2 rounded-full'></div>
                        <p><span>{statusCounts.pending} </span> Pending Tasks</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-[#01adce] w-2 rounded-full'></div>
                        <p><span>{statusCounts.inProgress} </span> In Progress Tasks</p>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div className='bg-[#74c40d] w-2 rounded-full'></div>
                        <p> <span>{statusCounts.completed} </span> Completed Tasks</p>
                    </div>

                </div>

            </div>




        </div>
    )
}

export default dashboard

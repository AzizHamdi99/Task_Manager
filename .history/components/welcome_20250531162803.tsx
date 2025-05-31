import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import { formatCustomDate } from '@/utils/date'
import React from 'react'

function Welcome() {
    const { user } = useAuthStore()
    const { tasks, loading, priorityCounts, statusCounts } = useTaskStore()
    const currentDate = formatCustomDate()
    const nbTasks = tasks?.length
    return (
        <div className=' bg-white p-6 flex flex-col gap-2 rounded-md shadow-sm'>
            <p className='font-bold text-3xl text-[#434343]'>Good Morning! <span>{user?.fullname}</span></p>
            <p className='text-[#b8babc] font-normal'>{currentDate}</p>
            <div className='flex items-center justify-between mt-1 text-[#999a9d]'>
                <div className='flex gap-2 items-center'>
                    <div className='w-2 rounded-full h-5 bg-[#115bea]'></div>
                    <p> <span className='text-[#1e1e1e] font-bold text-xl'>{nbTasks} </span> Total Tasks</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-[#7945f9] w-2 h-5 rounded-full'></div>
                    <p><span className='text-[#1e1e1e] font-bold text-xl'>{statusCounts.pending} </span> Pending Tasks</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-[#01adce] w-2 h-5 rounded-full'></div>
                    <p><span className='text-[#1e1e1e] font-bold text-xl'>{statusCounts.inProgress} </span> In Progress Tasks</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <div className='bg-[#74c40d] w-2 h-5 rounded-full'></div>
                    <p> <span className='text-[#1e1e1e] font-bold text-xl'>{statusCounts.completed} </span> Completed Tasks</p>
                </div>

            </div>

        </div>
    )
}

export default Welcome

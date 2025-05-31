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
        <div className='m-4'>
            <div className=''>
                <p>Good Morning! <span>{user?.fullname}</span></p>
                <p>{Date.now}</p>
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

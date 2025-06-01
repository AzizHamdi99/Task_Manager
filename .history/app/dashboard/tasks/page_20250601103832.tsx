"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

function tasks() {
    const { getTasks, tasks } = useTaskStore()
    const { user } = useAuthStore()


    useEffect(() => {
        getTasks(user?._id)
    }, [])
    console.log(tasks)
    return (
        <div>
            <div>
                <p>My Tasks</p>
                <div>
                    <div>
                        <p></p>

                    </div>


                </div>

            </div>



        </div>
    )
}

export default tasks

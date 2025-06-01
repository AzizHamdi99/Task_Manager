"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

function page() {
    const { getTasks, tasks } = useTaskStore()
    const { user } = useAuthStore()
    console.log(user)

    useEffect(() => {
        // getTasks(user._id)
    }, [])
    return (
        <div>

        </div>
    )
}

export default page

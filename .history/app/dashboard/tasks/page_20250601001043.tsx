"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

function page() {
    const { tasks } = useTaskStore()
    console.log(tasks)

    return (
        <div>

        </div>
    )
}

export default page

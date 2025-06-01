"use client"
import { useTaskStore } from '@/stores/useTask'
import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

function tasks() {
    const { tasks } = useTaskStore()
    console.log(tasks)

    return (
        <div>

        </div>
    )
}

export default tasks

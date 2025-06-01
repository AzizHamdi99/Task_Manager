"use client"
import { useTaskStore } from '@/stores/useTask'
import React, { useEffect } from 'react'

function TeamMembers() {
    const { getUsers, users } = useTaskStore()

    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)

    return (
        <div>
            <p>Team Members</p>
            <div>
                {users?.map(() => (
                    
                ))}
            </div>


        </div>
    )
}

export default TeamMembers

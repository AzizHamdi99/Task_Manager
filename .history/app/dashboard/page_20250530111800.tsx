"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

const dashboard = () => {
    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [user])
    console.log(user)
    return (
        <div>

        </div>
    )
}

export default dashboard

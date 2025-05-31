"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'

const Sidebar = () => {

    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div>




        </div>
    )
}

export default Sidebar

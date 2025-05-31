"use client"

import { useAuthStore } from '@/stores/useUser'
import { CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'

const dashboard = () => {
    const { user, fetchUser, loading } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) return (
        <CircularProgress />
    )
    console.log(user)
    return (
        <div>

        </div>
    )
}

export default dashboard

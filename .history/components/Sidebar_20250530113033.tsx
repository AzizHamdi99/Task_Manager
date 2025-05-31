"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { use, useEffect } from 'react'
import Image from 'next/image'


const Sidebar = () => {

    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className=' border-r-1 border-gray-200 w-1/6 shadow-md '>
            <div className='flex items-center justify-center my-2'>
                <Image width={100} height={100} src={user?.pic ?? "/nppdp.webp"} alt='no pdp' className='rounded-full' />
            </div>
            <p>{user?.fullname}</p>




        </div>
    )
}

export default Sidebar

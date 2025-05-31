"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { useEffect } from 'react'
import Image from 'next/image'


const Sidebar = () => {

    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className=' border-r-1 border-gray-200 '>
            <div className='flex items-center justify-center my-2'>
                <Image width={100} height={100} src={user?.pic ?? "/nppdp.webp"} alt='no pdp' className='rounded-full' />
            </div>




        </div>
    )
}

export default Sidebar

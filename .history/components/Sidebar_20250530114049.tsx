"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'


const Sidebar = () => {

    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className=' border-r-1 border-gray-200 w-1/6 shadow-sm h-screen '>
            <div className='flex items-center justify-center my-3'>
                <Image width={100} height={100} src={user?.pic ? user.pic : "/nppdp.webp"} alt='no pdp' className='rounded-full' />
            </div>
            <div>
                {user?.role === "ADMIN" && <p>{user?.role}</p>}
                <p>{user?.fullname}</p>
                <p>{user?.email}</p>
            </div>
            <div>
                <Link href={"/dashboard"}>
                    <div className='flex gap-1'>
                        <LayoutDashboard />
                        <p>Dashboard</p>
                    </div>

                </Link>
            </div>




        </div>
    )
}

export default Sidebar

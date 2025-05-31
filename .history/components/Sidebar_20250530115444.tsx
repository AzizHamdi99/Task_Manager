"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { BookPlus, ClipboardCheck, LayoutDashboard, LogOut, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from "next/navigation";


const Sidebar = () => {

    const { user, fetchUser, logout } = useAuthStore()
    useEffect(() => {
        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (err) {
            console.error("Failed to logout", err);
        }
    };

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
                    <div className='flex gap-2'>
                        <LayoutDashboard />
                        <p>Dashboard</p>
                    </div>

                </Link>
                {user?.role === "ADMIN" ? <div>

                    <Link href={"/tasks"}>
                        <div className='flex gap-2'>
                            <ClipboardCheck />
                            <p>Manage Tasks</p>
                        </div>

                    </Link>
                    <Link href={"/create-task"}>
                        <div className='flex gap-2'>
                            <BookPlus />
                            <p>Create Task</p>
                        </div>

                    </Link>
                    <Link href={"/Team Members"}>
                        <div className='flex gap-2'>
                            <UserRound />
                            <p>Team Members</p>
                        </div>

                    </Link>


                </div> : <div>

                    <Link href={"/tasks"}>
                        <div className='flex gap-2'>
                            <ClipboardCheck />
                            <p>My Tasks</p>
                        </div>

                    </Link>



                </div>}



                <div onClick={handleLogout} className='flex gap-2'>
                    <LogOut />
                    <p>Logout</p>
                </div>


            </div>




        </div>
    )
}

export default Sidebar

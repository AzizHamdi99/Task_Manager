"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { BookPlus, ClipboardCheck, LayoutDashboard, LogOut, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";


const Sidebar = () => {
    const router = useRouter();

    const { user, fetchUser, logout } = useAuthStore()
    const path = usePathname()
    console.log(path)





    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (err) {
            console.error("Failed to logout", err);
        }
    };

    return (
        <div className=' border-r-1 border-gray-200 w-1/6 shadow-sm h-screen flex flex-col '>
            <div className='flex items-center justify-center my-4'>
                <Image width={100} height={100} src={user?.pic ? user.pic : "/nppdp.webp"} alt='no pdp' className='rounded-full' />
            </div>
            <div className='text-center flex flex-col items-center mb-5'>
                {user?.role === "ADMIN" && <p className='text-[10px] text-white bg-blue-500 px-2 py-0.5 rounded-sm w-fit'>{user?.role}</p>}
                <p className='font-semibold text-[#080808] text-[20px]'>{user?.fullname}</p>
                <p className='text-[#707072]'>{user?.email}</p>
            </div>
            <div className='flex flex-col '>
                <Link href={"/dashboard"}>
                    <div className={path === "/dashboard" ? "flex gap-3 p-3  text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                        <LayoutDashboard />
                        <p>Dashboard</p>
                    </div>

                </Link>
                {user?.role === "ADMIN" ? <div>

                    <Link href={"/dashboard/Admintasks"}>
                        <div className={path === "/dashboard/Admintasks" ? "flex gap-3 p-3  text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <ClipboardCheck />
                            <p>Manage Tasks</p>
                        </div>

                    </Link>
                    <Link href={"/dashboard/create-task"}>
                        <div className={path === "/dashboard/create-task" ? "flex gap-3 p-3  text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <BookPlus />
                            <p>Create Task</p>
                        </div>

                    </Link>
                    <Link href={"/dashboard/TeamMembers"}>
                        <div className={path === "/dashboard/TeamMembers" ? "flex gap-3 p-3  text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <UserRound />
                            <p>Team Members</p>
                        </div>

                    </Link>


                </div> : <div>

                    <Link href={"/dashboard/tasks"}>
                        <div className={path === "/dashboard/tasks" ? "flex gap-3 p-3  text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <ClipboardCheck />
                            <p>My Tasks</p>
                        </div>

                    </Link>



                </div>}



                <div onClick={handleLogout} className='flex gap-3 p-3 cursor-pointer'>
                    <LogOut />
                    <p>Logout</p>
                </div>


            </div>




        </div>
    )
}

export default Sidebar

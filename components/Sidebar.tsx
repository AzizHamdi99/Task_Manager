"use client"

import { useAuthStore } from '@/stores/useUser'
import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { BookPlus, ClipboardCheck, LayoutDashboard, LogOut, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import { CircularProgress } from '@mui/material'


const Sidebar = () => {
    const router = useRouter();

    const { user, fetchUser, logout, loading } = useAuthStore()
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

    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className=' border-r-1 border-gray-200 w-1/5 shadow-sm h-screen flex flex-col '>
            <div className='flex items-center justify-center my-4 '>
                <Image
                    width={100}
                    height={100}
                    src={user?.pic ? user.pic : "/nppdp.webp"}
                    alt='no pdp'
                    className='rounded-full'
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}

                />

            </div>
            <div className='text-center flex flex-col items-center mb-5'>
                {user?.role === "ADMIN" && <p className='text-[10px] text-white bg-blue-500 px-2 py-0.5 rounded-sm w-fit'>{user?.role}</p>}
                <p className='font-semibold text-[#080808] text-[20px]'>{user?.fullname}</p>
                <p className='text-[#707072]'>{user?.email}</p>
            </div>
            <div className='flex flex-col '>
                <Link href={"/dashboard"}>
                    <div className={path === "/dashboard" ? "flex gap-3 p-3  bg-blue-100 text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                        <LayoutDashboard />
                        <p>Dashboard</p>
                    </div>

                </Link>
                {user?.role === "ADMIN" ? <div>

                    <Link href={"/dashboard/Tasks"}>
                        <div className={path === "/dashboard/Tasks" ? "flex gap-3 p-3 bg-blue-100 text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <ClipboardCheck />
                            <p>Manage Tasks</p>
                        </div>

                    </Link>
                    <Link href={"/dashboard/create-task"}>
                        <div className={path === "/dashboard/create-task" ? "flex gap-3 p-3 bg-blue-100 text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <BookPlus />
                            <p>Create Task</p>
                        </div>

                    </Link>
                    <Link href={"/dashboard/TeamMembers"}>
                        <div className={path === "/dashboard/TeamMembers" ? "flex gap-3 p-3 bg-blue-100 text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
                            <UserRound />
                            <p>Team Members</p>
                        </div>

                    </Link>


                </div> : <div>

                    <Link href={"/dashboard/Tasks"}>
                        <div className={path === "/dashboard/Tasks" ? "flex gap-3 p-3 bg-blue-100 text-blue-800 border-r-4 border-r-blue-600" : "flex gap-3 p-3 "}>
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

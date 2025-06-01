"use client"
import { useTaskStore } from '@/stores/useTask'
import Image from 'next/image'
import React, { useEffect } from 'react'

function TeamMembers() {
    const { getUsers, users } = useTaskStore()

    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)

    return (
        <div className='p-6 flex flex-col gap-4'>
            <p className='font-bold text-[#434343] text-2xl'>Team Members</p>
            <div className=' grid grid-cols-3 gap-5'>
                {users?.map((user, index) => (
                    <div className='bg-white p-4 rounded-md flex flex-col gap-1' key={index}>
                        <div className='flex items-center gap-3'>
                            <Image width={40} height={40} alt='pdp' src={user.pic || "/nppdp.webp"} className='rounded-full' />
                            <div>
                                <p>{user?.name}</p>
                                <p>{user?.email}</p>
                            </div>

                        </div>
                        <div className='flex items-center justify-between gap-3'>
                            <div>
                                <p>{user.taskCounts.pending}</p>
                                <p>Pending</p>

                            </div>
                            <div>
                                <p>{user.taskCounts.inProgress}</p>
                                <p>In Progress</p>

                            </div>
                            <div>
                                <p>{user.taskCounts.completed}</p>
                                <p>Completed</p>

                            </div>
                        </div>

                    </div>
                ))}
            </div>


        </div>
    )
}

export default TeamMembers

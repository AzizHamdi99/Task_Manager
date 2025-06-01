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
        <div>
            <p>Team Members</p>
            <div>
                {users?.map((user, index) => (
                    <div key={index}>
                        <div>
                            <Image width={40} height={40} alt='pdp' src={user.pic || "/nppdp.webp"} />
                            <div>
                                <p>{user?.name}</p>
                                <p>{user?.email}</p>
                            </div>

                        </div>
                        <div>
                            <div>
                                <p>{user.taskCounts.pending}</p>
                                <p>Pending</p>

                            </div>
                            <div>
                                <p>{user.taskCounts.inProgress}</p>
                                <p>in Progress</p>

                            </div>
                            <div>
                                <p>{user.taskCounts.pending}</p>
                                <p>Pending</p>

                            </div>
                        </div>

                    </div>
                ))}
            </div>


        </div>
    )
}

export default TeamMembers

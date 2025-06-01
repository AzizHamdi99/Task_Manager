
import { Task } from '@/types/types';
import { createdDate } from '@/utils/date';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'

import React from 'react'



function RecentTask({ tasks }: { tasks: Task[] }) {

    const sortedTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);
    console.log(sortedTasks)




    return (
        <div className='p-6 bg-white rounded-xl shadow-md flex flex-col gap-3.5'>
            <div className='flex items-center justify-between'>
                <p className='texxt-[#2e2e2e] font-semibold text-xl'>Recent Tasks</p>
                <Link href={"/dashboard/tasks"}>
                    <div className='flex gap-1 bg-[#f8f8fc] p-2 items-center rounded-md hover:text-blue-200 hover:bg-blue-600 transition-all'>
                        <p className=' text-sm'>See All</p>
                        <ArrowRight />

                    </div>

                </Link>

            </div>
            <div>
                <div className='grid grid-cols-[3fr_1fr_1fr_1fr] text-[#414143] font-bold p-2'>
                    <p>Name</p>
                    <p>Status</p>
                    <p>Priority</p>
                    <p>Created On</p>
                </div>
                <div>
                    {sortedTasks.map((t) => (
                        <div>
                            <div className='h-[1px] bg-gray-300'></div>
                            <div className='grid grid-cols-[3fr_1fr_1fr_1fr] px-2 py-4'>
                                <p className='text-[#141515] '>{t.title}</p>
                                <p className={t.status === "Pending" ? "bg-[#f2e3fb] text-[#8749bd] text-sm p-1 max-w-fit px-3 rounded-md" : t.status === "In Progress" ? "bg-blue-300 text-blue-500 text-sm p-1 max-w-fit px-3 rounded-md" : "bg-[#c1e9d1] text-[#66af7d] text-sm p-1 max-w-fit px-3 rounded-md"}>{t.status}</p>
                                <p className={t.priority === "High" ? "bg-[#fcdce0] text-[#d16f7b] text-sm p-1 max-w-fit px-3 rounded-md" : t.priority === "Meduim" ? "bg-[#fae3c5] text-[#e87d1a] text-sm p-1 max-w-fit px-3 rounded-md" : "bg-[#c1e9d1] text-[#66af7d] text-sm p-1 max-w-fit px-3 rounded-md"}>{t.priority}</p>
                                <p className='text-[#141515] text-[15px] '>{createdDate(new Date(t.createdAt))}</p>

                            </div>

                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default RecentTask

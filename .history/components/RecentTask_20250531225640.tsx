
import { Task } from '@/stores/useTask';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'

import React from 'react'



function RecentTask({ tasks }: { tasks: Task[] }) {

    const sortedTasks = [...tasks]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8);
    console.log(sortedTasks)

    const createdDate = (date: Date): string => {
        const day = date.getDate();
        const year = date.getFullYear();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];

        // Get ordinal suffix
        const getOrdinal = (n: number): string => {
            if (n > 3 && n < 21) return "th";
            switch (n % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}${getOrdinal(day)} ${month} ${year}`;
    };


    return (
        <div className='p-6 bg-white rounded-md shadow-md flex flex-col gap-3.5'>
            <div className='flex items-center justify-between'>
                <p className='texxt-[#2e2e2e] font-semibold text-xl'>Recent Tasks</p>
                <Link href={"/dashboard/tasks"}>
                    <div className='flex gap-1 bg-[#f8f8fc] p-2 items-center rounded-md'>
                        <p className='text-[#5c5e60] text-sm'>See All</p>
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
                                <p className={t.status === "Pending" ? "bg-purple-400" : t.status === "In Progress" ? "" :}>{t.status}</p>
                                <p>{t.priority}</p>
                                <p>{createdDate(new Date(t.createdAt))}</p>

                            </div>

                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default RecentTask

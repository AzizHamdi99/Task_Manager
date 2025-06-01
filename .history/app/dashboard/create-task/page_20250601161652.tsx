"use client"
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon, Paperclip, PersonStanding, Plus, Trash2, UserRound } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useTaskStore } from '@/stores/useTask'
import Image from 'next/image'
import { useAuthStore } from '@/stores/useUser'


function page() {

    const [date, setDate] = useState()

    const { users, getUsers } = useTaskStore()
    const { user, fetchUser } = useAuthStore()
    useEffect(() => {
        getUsers()


    }, [])
    useEffect(() => {
        if (user?.id) {
            setData(prev => ({
                ...prev,
                createdBy: user.id
            }));
        }
    }, [user]);

    const [task, setTask] = useState("")
    const [attachment, setAttachment] = useState("")


    const [data, setData] = useState({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        assignedTo: [],
        createdBy: "",
    });
    const [attachments, setAttachments] = useState([])

    const [todoCheckList, setTodoCheckList] = useState(["eezezez", "dsdssldksld"])


    return (
        <form className='flex flex-col m-6 gap-3 w-4xl rounded-xl shadow-md p-6 bg-white'>
            <p className='text-2xl font-semibold text-[#2b2b2b]'>Create Task</p>
            <div className='flex flex-col gap-1.5'>
                <p className='text-[#696a73] font-semibold text-sm' >Task Title</p>
                <input type="text" className='px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full' placeholder='Create App UI' />
            </div>
            <div className='flex flex-col gap-1.5'>
                <p className='text-[#696a73] font-semibold text-sm' >Description</p>
                <textarea name="" id="" placeholder='Describe task' className='px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full h-32' ></textarea>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-[#696a73] font-semibold text-sm' >Priority</p>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Meduim">Meduim</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-[#696a73] font-semibold text-sm'>Due Date</p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[240px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className='flex flex-col gap-1.5' >
                    <p className='text-[#696a73] font-semibold text-sm'>Assigned to</p>
                    <Dialog>
                        <DialogTrigger className='flex gap-1'><UserRound /> Add Members</DialogTrigger>
                        <DialogContent>
                            <DialogHeader >
                                <DialogTitle>Select Users</DialogTitle>

                                <DialogDescription>
                                    <div className='flex flex-col gap-6 mt-4' >
                                        {users?.map((user, i) => (
                                            <div key={i} className='flex flex-col gap-1' >
                                                <div className='flex justify-between items-center'>

                                                    <div className='flex items-center gap-2'>
                                                        <Image className='rounded-full' height={40} width={40} alt='pdp' src={user?.pic || "/nppdp.webp"} />
                                                        <div>
                                                            <p>{user?.name}</p>
                                                            <p>{user?.email}</p>
                                                        </div>
                                                    </div>
                                                    <input type="checkbox" />

                                                </div>
                                                <hr />
                                            </div>
                                        ))}

                                    </div>

                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Done</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>


                </div>



            </div>
            <div className='flex flex-col gap-3'>
                <p className='text-[#696a73] font-semibold text-sm'>TODO Checklist</p>
                {todoCheckList.length > 0 &&
                    <div className='flex flex-col gap-3'>
                        {todoCheckList.map((todo, i) => (
                            <div className='flex justify-between items-center py-1.5 bg-[#f6f8fa] px-3 rounded-sm' key={i}>
                                <div className='flex items-center gap-3 ' >
                                    <p className='text-gray-500'>{i + 1}</p>
                                    <p className='text-[#2b2b2b] font-medium'>{todo}</p>
                                </div>
                                <Trash2 size={20} className='text-red-600 cursor-pointer' />

                            </div>
                        ))}


                    </div>}
                <div className='flex justify-between items-center gap-5'>
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Enter Task' className='px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full' />
                    <div className=' flex items-center gap-2 px-3 py-1.5 bg-[#e3e4e6] cursor-pointer rounded-sm'>
                        <Plus />
                        <p className='text-sm'>Add</p>
                    </div>
                </div>


            </div>
            <div className='flex flex-col gap-3 my-3'>
                <p className='text-[#696a73] font-semibold text-sm'>Add Attachments</p>
                {attachments.length > 0 &&
                    <div className='flex flex-col gap-3'>
                        {attachments.map((att, i) => (
                            <div className='flex justify-between items-center py-1.5 bg-[#f6f8fa] px-3 rounded-sm' key={i}>
                                <div className='flex items-center gap-3 '>
                                    <p className='text-gray-500'>{i + 1}</p>
                                    <p className='text-[#2b2b2b] font-medium'>{att}</p>
                                </div>
                                <Trash2 size={20} className='text-red-600' />

                            </div>
                        ))}


                    </div>}
                <div className='flex justify-between items-center gap-5'>
                    <div>
                        <Paperclip />
                        <input type="text" value={attachment} onChange={(e) => setAttachment(e.target.value)} placeholder='Add File Link' />
                    </div>
                    <div className=' flex items-center gap-2 px-3 py-1.5 bg-[#e3e4e6] cursor-pointer rounded-sm'>
                        <Plus />
                        <p className='text-sm'>Add</p>
                    </div>
                </div>


            </div>
            <button className='uppercase'>Create task</button>





        </form>
    )
}

export default page

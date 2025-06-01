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
import { CalendarIcon, PersonStanding, Plus, Trash2, UserRound } from "lucide-react"
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

    const [todoCheckList, setTodoCheckList] = useState([])


    return (
        <form>
            <p>Create Task</p>
            <div>
                <p >Task Title</p>
                <input type="text" placeholder='Create App UI' />
            </div>
            <div>
                <p >Description</p>
                <textarea name="" id="" placeholder='Describe task'></textarea>
            </div>
            <div>
                <div>
                    <p >Priority</p>
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
                <div>
                    <p>Due Date</p>
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
                <div>
                    <p>Assigned to</p>
                    <Dialog>
                        <DialogTrigger><UserRound /> Add Members</DialogTrigger>
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
            <div>
                <p>TODO Checklist</p>
                {todoCheckList.length > 0 &&
                    <div>
                        {todoCheckList.map((todo, i) => (
                            <div key={i}>
                                <div>
                                    <p>{i + 1}</p>
                                    <p>{todo}</p>
                                </div>
                                <Trash2 className='text-red-600' />

                            </div>
                        ))}


                    </div>}
                <div>
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder='Enter Task' />
                    <div>
                        <Plus />
                        <p>Add</p>
                    </div>
                </div>


            </div>
            <div>
                <p>Add Attachments</p>
                {attachments.length > 0 &&
                    <div>
                        {attachments.map((att, i) => (
                            <div key={i}>
                                <div>
                                    <p>{i + 1}</p>
                                    <p>{att}</p>
                                </div>
                                <Trash2 className='text-red-600' />

                            </div>
                        ))}


                    </div>}
                <div>
                    <input type="text" value={attachment} onChange={(e) => setAttachment(e.target.value)} placeholder='Enter Task' />
                    <div>
                        <Plus />
                        <p>Add</p>
                    </div>
                </div>


            </div>





        </form>
    )
}

export default page

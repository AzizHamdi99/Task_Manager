"use client"
import { useTaskStore } from '@/stores/useTask'
import { useParams } from 'next/navigation'

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

import Image from 'next/image'
import { useAuthStore } from '@/stores/useUser'

const updatePage = () => {

    const params = useParams()
    const taskId = params.taskId
    const { task, getTask, users, getUsers, addTask } = useTaskStore()
    const { user, fetchUser } = useAuthStore()


    const [currenttask, setcurrentTask] = useState("")
    const [attachment, setAttachment] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        getTask(taskId)
    }, [])
    const [date, setDate] = useState()
    const [data, setData] = useState({
        title: "",
        description: "",
        priority: "",
        dueDate: null as Date | null,
        assignedTo: [] as string[],
        createdBy: "",
        todoCheckList: [] as { text: string, completed: boolean }[],
        attachments: [] as string[],
    })

    console.log(task)
    const [attachments, setAttachments] = useState<string[]>([])
    const [todoCheckList, setTodoCheckList] = useState<{ text: string, completed: boolean }[]>([])

    const [assignedUserIds, setAssignedUserIds] = useState<string[]>([])
    useEffect(() => {
        getUsers()


    }, [])




    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const finalData = {
                ...data,
                dueDate: date,
                todoCheckList,
                attachments,
                assignedTo: assignedUserIds,
            }
            await addTask(finalData)



            setData({
                title: "",
                description: "",
                priority: "",
                dueDate: null,
                assignedTo: [] as string[],
                createdBy: "",
                todoCheckList: [],
                attachments: [] as string[],
            })
            setAttachments([])

            setAssignedUserIds([])
            setTodoCheckList([])
            setDate(undefined)

        } catch (error) {
            console.log(error)

        }


    }
    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    useEffect(() => {
        if (user?._id) {
            setData(prev => ({
                ...prev,
                createdBy: user._id,
            }));
        }
    }, [user]);

    useEffect(() => {
        if (task) {
            setData({
                title: task.title || "",
                description: task.description || "",
                priority: task.priority || "",
                dueDate: task.dueDate || "",
                assignedTo: task.assignedTo || [],
                createdBy: task.createdBy || "",
                todoCheckList: [], // we'll set this next
                attachments: [], // set this next
            });
            setDate(task.dueDate ? new Date(task.dueDate) : undefined);
            setAttachments(task.attachments || []);
            setTodoCheckList(task.todoCheckList || []);
            setAssignedUserIds(task.assignedTo || []);
        }
    }, [task]);


    const handleAddTodo = () => {
        if (currenttask.trim()) {
            setTodoCheckList(prev => [...prev, { text: currenttask.trim(), completed: false }])
            setcurrentTask("")
        }
    }

    const handleAddAttachment = () => {
        if (attachment.trim()) {
            setAttachments(prev => [...prev, attachment])
            setAttachment("")
        }
    }

    const toggleAssignUser = (id: string) => {
        setAssignedUserIds(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        )
    }

    function handleDone() {
        setDialogOpen(false)
    }
    return (
        <form onSubmit={handleSubmitForm} className='flex flex-col m-6 gap-3 w-4xl rounded-xl shadow-md p-6 bg-white'>
            <p className='text-2xl font-semibold text-[#2b2b2b]'>Update Task</p>
            <div className='flex flex-col gap-1.5'>
                <p className='text-[#696a73] font-semibold text-sm' >Task Title</p>
                <input value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} type="text" className='px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full' placeholder='Create App UI' />
            </div>
            <div className='flex flex-col gap-1.5'>
                <p className='text-[#696a73] font-semibold text-sm' >Description</p>
                <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} name="" id="" placeholder='Describe task' className='px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full h-32' ></textarea>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-[#696a73] font-semibold text-sm' >Priority</p>
                    <Select onValueChange={(value) => setData({ ...data, priority: value })}>
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
                <div className='flex flex-col gap-1.5'>
                    <p className='text-[#696a73] font-semibold text-sm'>Assigned to</p>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            {assignedUserIds.length > 0 ? (
                                <div className='flex -space-x-4 items-center cursor-pointer'>
                                    {assignedUserIds.map((id) => {
                                        const assignedUser = users?.find((u) => u.userId === id);
                                        return assignedUser ? (
                                            <div >
                                                <Image
                                                    key={id}
                                                    src={assignedUser.pic || "/nppdp.webp"}
                                                    alt="user"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full border-[2px] border-white"
                                                />
                                            </div>
                                        ) : null;
                                    })}



                                </div>
                            ) : (
                                <div className="flex gap-1 items-center cursor-pointer">
                                    <UserRound />
                                    <span>Add Members</span>
                                </div>
                            )}
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Select Users</DialogTitle>
                                <DialogDescription>
                                    <div className='flex flex-col gap-6 mt-4'>
                                        {users?.map((user, i) => (
                                            <div key={i} className='flex flex-col gap-1'>
                                                <div className='flex justify-between items-center'>
                                                    <div className='flex items-center gap-2'>
                                                        <Image
                                                            className='rounded-full'
                                                            height={40}
                                                            width={40}
                                                            alt='pdp'
                                                            src={user?.pic || "/nppdp.webp"}
                                                        />
                                                        <div>
                                                            <p>{user?.name}</p>
                                                            <p className='text-sm text-gray-500'>{user?.email}</p>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        checked={assignedUserIds.includes(user?.userId)}
                                                        onChange={() => toggleAssignUser(user?.userId)}
                                                    />
                                                </div>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button className='cursor-pointer' variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="button" className='cursor-pointer' onClick={handleDone}>Done</Button>
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
                                    <p className='text-[#2b2b2b] font-medium'>{todo.text}</p>
                                </div>
                                <Trash2 size={20} className='text-red-600 cursor-pointer' onClick={() =>
                                    setTodoCheckList(prev => prev.filter((_, index) => index !== i))
                                } />

                            </div>
                        ))}


                    </div>}
                <div className='flex justify-between items-center gap-5'>
                    <input type="text" value={currenttask} onChange={(e) => setcurrentTask(e.target.value)} placeholder='Enter Task' className='px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full' />
                    <div className=' flex items-center gap-2 px-3 py-1.5 bg-[#e3e4e6] cursor-pointer rounded-sm' onClick={handleAddTodo}>
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
                                <Trash2 onClick={() =>
                                    setAttachments(prev => prev.filter((_, index) => index !== i))
                                } size={20} className='text-red-600' />

                            </div>
                        ))}


                    </div>}
                <div className='flex justify-between items-center gap-5'>
                    <div className="flex gap-2 px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full">
                        <Paperclip />
                        <input type="text" value={attachment} onChange={(e) => setAttachment(e.target.value)} placeholder='Add File Link' className='w-full outline-none' />
                    </div>
                    <div className=' flex items-center gap-2 px-3 py-1.5 bg-[#e3e4e6] cursor-pointer rounded-sm' onClick={handleAddAttachment}>
                        <Plus />
                        <p className='text-sm'>Add</p>
                    </div>
                </div>


            </div>
            <button
                type="submit"
                className="uppercase bg-blue-500 hover:bg-blue-400 transition-all duration-100 font-medium cursor-pointer text-white py-2 rounded"
            >
                Create task
            </button>





        </form >
    )
}

export default updatePage

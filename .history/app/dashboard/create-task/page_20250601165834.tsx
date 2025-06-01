"use client"
import React, { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import {
    CalendarIcon,
    Paperclip,
    Plus,
    Trash2,
    UserRound,
} from "lucide-react"
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
import { useTaskStore } from "@/stores/useTask"
import Image from "next/image"
import { useAuthStore } from "@/stores/useUser"

function Page() {
    const [date, setDate] = useState<Date>()
    const [data, setData] = useState({
        title: "",
        description: "",
        priority: "",
        dueDate: "",
        assignedTo: [] as string[],
        createdBy: "", // new field
    })

    const [todoCheckList, setTodoCheckList] = useState<
        { text: string; completed: boolean }[]
    >([])
    const [taskInput, setTaskInput] = useState("")
    const [attachments, setAttachments] = useState<string[]>([])
    const [attachmentInput, setAttachmentInput] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)

    const { users, getUsers } = useTaskStore()
    const { user, fetchUser } = useAuthStore()

    useEffect(() => {
        getUsers()
        fetchUser()
    }, [])

    useEffect(() => {
        if (user?.id) {
            setData((prev) => ({ ...prev, createdBy: user.id }))
        }
    }, [user])

    useEffect(() => {
        if (date) {
            setData((prev) => ({ ...prev, dueDate: date.toISOString() }))
        }
    }, [date])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    function handlePriorityChange(value: string) {
        setData((prev) => ({ ...prev, priority: value }))
    }

    function handleUserToggle(userId: string, checked: boolean) {
        setData((prev) => {
            const newAssigned = checked
                ? [...prev.assignedTo, userId]
                : prev.assignedTo.filter((id) => id !== userId)
            return { ...prev, assignedTo: newAssigned }
        })
    }

    function addTodo() {
        if (!taskInput.trim()) return
        setTodoCheckList((prev) => [...prev, { text: taskInput.trim(), completed: false }])
        setTaskInput("")
    }

    function removeTodo(index: number) {
        setTodoCheckList((prev) => prev.filter((_, i) => i !== index))
    }

    function addAttachment() {
        if (!attachmentInput.trim()) return
        setAttachments((prev) => [...prev, attachmentInput.trim()])
        setAttachmentInput("")
    }

    function removeAttachment(index: number) {
        setAttachments((prev) => prev.filter((_, i) => i !== index))
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const finalData = {
            ...data,
            todoCheckList,
            attachments,
        }
        console.log("Submit", finalData)
        // Add your submit logic here
    }

    // Close dialog on Done click
    function handleDone() {
        setDialogOpen(false)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col m-6 gap-3 w-4xl rounded-xl shadow-md p-6 bg-white"
        >
            <p className="text-2xl font-semibold text-[#2b2b2b]">Create Task</p>

            <div className="flex flex-col gap-1.5">
                <p className="text-[#696a73] font-semibold text-sm">Task Title</p>
                <input
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    type="text"
                    className="px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full"
                    placeholder="Create App UI"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <p className="text-[#696a73] font-semibold text-sm">Description</p>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    placeholder="Describe task"
                    className="px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full h-32"
                />
            </div>

            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1.5">
                    <p className="text-[#696a73] font-semibold text-sm">Priority</p>
                    <Select onValueChange={handlePriorityChange} value={data.priority}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <p className="text-[#696a73] font-semibold text-sm">Due Date</p>
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
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col gap-1.5">
                    <p className="text-[#696a73] font-semibold text-sm">Assigned to</p>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger className="flex gap-1 cursor-pointer">
                            <UserRound /> Add Members
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Select Users</DialogTitle>
                                <DialogDescription>
                                    <div className="flex flex-col gap-6 mt-4 max-h-[300px] overflow-auto">
                                        {users?.map((u, i) => (
                                            <div key={i} className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        className="rounded-full"
                                                        height={40}
                                                        width={40}
                                                        alt="pdp"
                                                        src={u?.pic || "/nppdp.webp"}
                                                    />
                                                    <div>
                                                        <p>{u?.name}</p>
                                                        <p>{u?.email}</p>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={data.assignedTo.includes(u.id)}
                                                    onChange={(e) => handleUserToggle(u.id, e.target.checked)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="button" onClick={handleDone}>
                                    Done
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[#696a73] font-semibold text-sm">TODO checklist</p>
                {todoCheckList.length > 0 &&
                    todoCheckList.map((todo, i) => (
                        <div
                            className="flex justify-between items-center py-1.5 bg-[#f6f8fa] px-3 rounded-sm"
                            key={i}
                        >
                            <div className="flex items-center gap-3 ">
                                <p className="text-gray-500">{i + 1}</p>
                                <p className="text-[#2b2b2b] font-medium">{todo.text}</p>
                            </div>
                            <Trash2
                                size={20}
                                className="text-red-600 cursor-pointer"
                                onClick={() => removeTodo(i)}
                            />
                        </div>
                    ))}
                <div className="flex justify-between items-center gap-5">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter Task"
                        className="px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full"
                    />
                    <Button
                        type="button"
                        onClick={addTodo}
                        disabled={taskInput.trim() === ""}
                        className="flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Add
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[#696a73] font-semibold text-sm">Attachments</p>
                {attachments.length > 0 &&
                    attachments.map((att, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center py-1.5 bg-[#f6f8fa] px-3 rounded-sm"
                        >
                            <div className="flex items-center gap-3">
                                <Paperclip size={20} />
                                <p className="text-[#2b2b2b] font-medium">{att}</p>
                            </div>
                            <Trash2
                                size={20}
                                className="text-red-600 cursor-pointer"
                                onClick={() => removeAttachment(i)}
                            />
                        </div>
                    ))}
                <div className="flex justify-between items-center gap-5">
                    <input
                        type="text"
                        value={attachmentInput}
                        onChange={(e) => setAttachmentInput(e.target.value)}
                        placeholder="Enter Attachment URL"
                        className="px-2 py-1.5 rounded-sm outline-none border-[1px] border-gray-200 w-full"
                    />
                    <Button
                        type="button"
                        onClick={addAttachment}
                        disabled={attachmentInput.trim() === ""}
                        className="flex items-center justify-center gap-2"
                    >
                        <Plus size={20} /> Add
                    </Button>
                </div>
            </div>

            <Button
                className="mt-6 w-[300px]"
                disabled={
                    !data.title ||
                    !data.description ||
                    !data.priority ||
                    !data.dueDate ||
                    data.assignedTo.length === 0
                }
                type="submit"
            >
                Create Task
            </Button>
        </form>
    )
}

export default Page

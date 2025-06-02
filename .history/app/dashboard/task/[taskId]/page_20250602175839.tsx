"use client"

import { useTaskStore } from '@/stores/useTask'
import { CircularProgress, Avatar, AvatarGroup } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import dayjs from 'dayjs'

function TaskPage() {
    const params = useParams()
    const taskId = params.taskId
    const { task, getTask, users, getUsers, loading } = useTaskStore()

    useEffect(() => {
        getTask(taskId as string)
    }, [])

    useEffect(() => {
        getUsers()
    }, [])

    if (loading || !task) {
        return (
            <div className="h-screen flex items-center justify-center">
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            {/* Title and Status */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
                    <p className="text-gray-600">{task.description}</p>
                </div>
                <span className="text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full h-fit">
                    {task.status}
                </span>
            </div>

            {/* Priority, Due Date, Assigned To */}
            <div className="flex flex-wrap gap-10 mt-6">
                <div>
                    <p className="text-gray-500 text-sm">Priority</p>
                    <p className="font-medium">{task.priority}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Due Date</p>
                    <p className="font-medium">{dayjs(task.dueDate).format('DD MMM YYYY')}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Assigned To</p>
                    <div className="flex mt-1">
                        <AvatarGroup max={4}>
                            {task.assignedTo?.map((userId: string) => {
                                const user = users.find(u => u._id === userId)
                                return user ? (
                                    <Avatar key={userId} alt={user.name} src={user.image || ""} />
                                ) : null
                            })}
                        </AvatarGroup>
                    </div>
                </div>
            </div>

            {/* Todo Checklist */}
            <div className="mt-6">
                <p className="text-gray-500 text-sm mb-2">Todo Checklist</p>
                <ul className="space-y-2">
                    {task.todoCheckList.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <input type="checkbox" checked={item.completed} disabled />
                            <span className={`${item.completed ? 'line-through text-gray-400' : ''}`}>
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Attachments */}
            {task.attachments && task.attachments.length > 0 && (
                <div className="mt-6">
                    <p className="text-gray-500 text-sm mb-2">Attachments</p>
                    <ul className="space-y-1">
                        {task.attachments.map((url, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="text-gray-700 font-medium">0{idx + 1}</span>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline truncate max-w-xs"
                                >
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default TaskPage

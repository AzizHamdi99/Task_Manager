"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


function page() {

    const [date, setDate] = useState()
    return (
        <div>
            <p>Create Task</p>
            <div>
                <label htmlFor="">Task Title</label>
                <input type="text" placeholder='Create App UI' />
            </div>
            <div>
                <label htmlFor="">Description</label>
                <textarea name="" id="" placeholder='Describe task'></textarea>
            </div>
            <div>
                <div>
                    <label htmlFor="">Priority</label>
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
                    <label htmlFor="">Due Date</label>
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
                    <label htmlFor="">Assigned to</label>

                </div>



            </div>



        </div>
    )
}

export default page

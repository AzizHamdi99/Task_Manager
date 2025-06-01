import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function page() {
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
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>


            </div>



        </div>
    )
}

export default page

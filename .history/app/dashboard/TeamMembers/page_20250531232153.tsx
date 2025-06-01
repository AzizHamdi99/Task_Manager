import { useTaskStore } from '@/stores/useTask'
import React, { useEffect } from 'react'

function page() {
    const { getUsers, users } = useTaskStore()

    useEffect(() => {
        getUsers()
    }, [])
    console.log(users)

    return (
        <div>


        </div>
    )
}

export default page

import { useParams } from 'next/navigation'
import React from 'react'

const updatePage = () => {

    const params = useParams()
    const taskId = params.taskId

    console.log(taskId)
    return (
        <div>

        </div>
    )
}

export default updatePage

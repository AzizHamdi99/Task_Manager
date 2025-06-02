import { useParams } from 'next/navigation'
import React from 'react'

const updatePage = () => {

    const params = useParams()
    const taskId = params.taskId //
    return (
        <div>

        </div>
    )
}

export default updatePage

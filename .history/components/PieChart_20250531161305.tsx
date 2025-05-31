import React from 'react'
interface StatusCount {
    pending: number,
    inProgress: number,
    completed: number
}
function PieChart({ statusData }: { statusData: StatusCount }) {
    console.log(statusData)
    return (
        <div>

        </div>
    )
}

export default PieChart

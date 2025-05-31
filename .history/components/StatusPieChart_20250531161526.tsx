import React from 'react'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusCount {
    pending: number,
    inProgress: number,
    completed: number
}
function StatusPieChart({ statusData }: { statusData: StatusCount }) {
    console.log(statusData)
    return (
        <div>

        </div>
    )
}

export default StatusPieChart

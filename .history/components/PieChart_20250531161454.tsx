import React from 'react'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

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

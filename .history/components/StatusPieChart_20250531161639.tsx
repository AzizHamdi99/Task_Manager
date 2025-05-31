import React from 'react'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusCount {
    pending: number,
    inProgress: number,
    completed: number
}
const COLORS = ['#7945f9', '#01adce', '#74c40d'];

function StatusPieChart({ statusData }: { statusData: StatusCount }) {
    console.log(statusData)
    return (
        <div>

        </div>
    )
}

export default StatusPieChart

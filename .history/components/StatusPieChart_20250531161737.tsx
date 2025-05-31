import React from 'react'

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface StatusCount {
    pending: number,
    inProgress: number,
    completed: number
}
const COLORS = ['#7945f9', '#01adce', '#74c40d'];

function StatusPieChart({ statusData }: { statusData: StatusCount }) {
    const chartData = [
        { name: 'Pending', value: statusData.pending },
        { name: 'In Progress', value: statusData.inProgress },
        { name: 'Completed', value: statusData.completed },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default StatusPieChart

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
interface PriorityCount {
    Low: number,
    Meduim: number,
    Hard: number
}
const COLORS = ['#01a367', '#e28000', '#ed1a49'];

function StatusBarChart({ PriorityData }: { PriorityData: PriorityCount }) {

    const chartData = [
        { name: 'Low', value: PriorityData.Low },
        { name: 'Meduim', value: PriorityData.Meduim },
        { name: 'Hard', value: PriorityData.Hard },
    ];
    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 style={{ textAlign: 'center' }}>Task Priority Levels</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatusBarChart

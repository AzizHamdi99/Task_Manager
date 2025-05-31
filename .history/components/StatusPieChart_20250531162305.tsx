import React from 'react'

import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
} from "recharts";

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
        <div className="w-full max-w-md mx-auto bg-white p-6">
            <h2 className="text-lg font-semibold mb-4">Task Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        fill="#8884d8"
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        formatter={(value) => (
                            <span style={{ color: "#333", fontSize: 14 }}>{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatusPieChart

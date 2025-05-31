import React from 'react'

import {
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface StatusCount {
    pending: number,
    inProgress: number,
    completed: number
}
const COLORS = ['#7945f9', '#01adce', '#74c40d'];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        return (
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: 14,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    pointerEvents: 'none',
                    maxWidth: 180,
                }}
            >
                <p style={{ margin: 0, fontWeight: 'bold' }}>{value} {name}</p>

            </div>
        );
    }
    return null;
};


function StatusPieChart({ statusData }: { statusData: StatusCount }) {
    const chartData = [
        { name: 'Pending', value: statusData.pending },
        { name: 'In Progress', value: statusData.inProgress },
        { name: 'Completed', value: statusData.completed },
    ];
    return (
        <div className=" rounded-md shadow-sm bg-white p-6 w-1/2">
            <h2 className="text-lg font-semibold mb-4">Task Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="60%"
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
                    <Tooltip content={<CustomTooltip />} />
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

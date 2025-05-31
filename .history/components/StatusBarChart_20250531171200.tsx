import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PriorityCounts {
    Low: number;
    meduim: number;
    high: number;
}

function StatusBarChart({ PriorityData }: { PriorityData: PriorityCounts }) {
    const chartData = [
        { name: "Low", value: PriorityData.Low, fill: "#00B386" },
        { name: "Medium", value: PriorityData.meduim, fill: "#F4A300" },
        { name: "High", value: PriorityData.high, fill: "#F23D5C" },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Task Priority Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} barCategoryGap="30%">
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `Count: ${value}`} />
                    <Bar dataKey="value">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatusBarChart;

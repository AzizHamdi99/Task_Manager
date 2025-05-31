import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PriorityCounts {
    low: number;
    medium: number;
    high: number;
}

function StatusBarChart({ PriorityData }: { PriorityData: PriorityCounts }) {
    const chartData = [
        { name: "Low", value: PriorityData.low, fill: "#00B386" },
        { name: "Medium", value: PriorityData.medium, fill: "#F4A300" },
        { name: "High", value: PriorityData.high, fill: "#F23D5C" },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Task Priority Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    barCategoryGap="25%"
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number, name: string) => [`Count: ${value}`, name]} />
                    {
                        chartData.map((entry, index) => (
                            <Bar
                                key={index}
                                dataKey="value"
                                fill={entry.fill}
                                barSize={100 / chartData.length}
                            />
                        ))
                    }
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatusBarChart;

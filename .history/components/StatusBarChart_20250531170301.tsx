import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PriorityCounts {
    Low: number;
    medium: number;
    high: number;
}

function StatusBarChart({ PriorityData }: { PriorityData: PriorityCounts }) {
    const chartData = [
        { name: "Low", value: PriorityData.Low, fill: "#00B386" },
        { name: "Medium", value: PriorityData.medium, fill: "#F4A300" },
        { name: "High", value: PriorityData.high, fill: "#F23D5C" },
    ];

    console.log(PriorityData)
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Task Priority Levels</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={chartData}
                    barCategoryGap={0} // No space between categories
                    barGap={4}          // Small gap between bars if there are multiple in one category
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number, name: string) => [`Count: ${value}`, name]} />
                    <Bar dataKey="value" barSize={80} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StatusBarChart;

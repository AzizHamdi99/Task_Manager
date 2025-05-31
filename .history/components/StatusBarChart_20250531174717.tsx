import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PriorityCounts {
    low: number;
    meduim: number; // keeping your spelling for now
    high: number;
}

function StatusBarChart({ PriorityData }: { PriorityData: PriorityCounts }) {
    const chartData = [
        { name: "Low", value: PriorityData.low, fill: "#00B386" },
        { name: "Meduim", value: PriorityData.meduim, fill: "#F4A300" },
        { name: "High", value: PriorityData.high, fill: "#F23D5C" },
    ];

    return (
        <div className=" h-full p-6 w-1/2 bg-white">
            <h2 className="text-lg font-semibold mb-4">Task Priority Levels</h2>
            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        barCategoryGap="5%" // Minimal gap between bars
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `Count: ${value}`} />
                        <Bar
                            dataKey="value"
                            barSize={400} // Even bigger bars
                            maxBarSize={400} // Maximum bar width
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default StatusBarChart;

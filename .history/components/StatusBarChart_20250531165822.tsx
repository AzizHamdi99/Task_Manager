import React from 'react'
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

        </div>
    )
}

export default StatusBarChart

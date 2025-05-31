import React from 'react'

interface PriorityCount {
    Low: number,
    Meduim: number,
    Hard: number
}
const COLORS = ['#01a367', '#e28000', '#FFBB28'];

function StatusBarChart({ PriorityData }: { PriorityData: PriorityCount }) {

    const chartData = [
        { name: 'Low', value: PriorityData.Low },
        { name: 'Meduim', value: PriorityData.Meduim },
        { name: 'Hard', value: PriorityData.Hard },
    ];
    return (
        <div>

        </div>
    )
}

export default StatusBarChart

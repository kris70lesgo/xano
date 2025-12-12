'use client';

import React from 'react';
import Card from '../ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Received', value: 24, color: '#E5E7EB' }, // Gray-200
    { name: 'Parsed', value: 32, color: '#93C5FD' },   // Blue-300
    { name: 'Pricing', value: 18, color: '#FCD34D' },  // Amber-300
    { name: 'Drafted', value: 12, color: '#FCA5A5' },  // Red-300
    { name: 'Sent', value: 28, color: '#FF6B6B' },     // Primary Red
    { name: 'Won', value: 10, color: '#10B981' },      // Emerald-500
    { name: 'Lost', value: 4, color: '#6B7280' },      // Gray-500
];

const PipelineBreakdown = () => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0);
    const parsed = data.find(d => d.name === 'Parsed')?.value || 0;
    const parsedPercentage = Math.round((parsed / total) * 100);

    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-dark">RFQ Pipeline Breakdown</h3>
                <p className="text-sm text-gray-500">Distribution of RFQs by status</p>
            </div>

            <div className="flex-1 min-h-[300px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pb-8">
                    <div className="text-3xl font-bold text-dark">{total}</div>
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Total RFQs</div>
                </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-xl flex items-center justify-between">
                <div>
                    <div className="text-sm font-semibold text-green-800">AI-Parsed Success</div>
                    <div className="text-xs text-green-600">Successfully extracted data</div>
                </div>
                <div className="text-xl font-bold text-green-700">{parsedPercentage}%</div>
            </div>
        </Card>
    );
};

export default PipelineBreakdown;

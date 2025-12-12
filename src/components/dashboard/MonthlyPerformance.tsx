'use client';

import React from 'react';
import Card from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
    { name: 'Jan', rfqs: 40, sent: 24, wins: 12 },
    { name: 'Feb', rfqs: 30, sent: 18, wins: 8 },
    { name: 'Mar', rfqs: 50, sent: 35, wins: 20 }, // High
    { name: 'Apr', rfqs: 45, sent: 30, wins: 15 },
    { name: 'May', rfqs: 60, sent: 48, wins: 25 }, // Peak
    { name: 'Jun', rfqs: 55, sent: 40, wins: 22 },
    { name: 'Jul', rfqs: 48, sent: 32, wins: 18 },
    { name: 'Aug', rfqs: 52, sent: 38, wins: 20 },
    { name: 'Sep', rfqs: 45, sent: 30, wins: 15 },
    { name: 'Oct', rfqs: 58, sent: 45, wins: 24 },
    { name: 'Nov', rfqs: 0, sent: 0, wins: 0 },
    { name: 'Dec', rfqs: 0, sent: 0, wins: 0 },
];

const MonthlyPerformance = () => {
    return (
        <Card className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-dark">Monthly Performance</h3>
                    <p className="text-sm text-gray-500">RFQs vs Proposals vs Wins</p>
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-600 transition-colors border border-gray-200">
                    <span>Jan 2025 – Dec 2025</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 0,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#F9FAFB' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ paddingBottom: '20px' }}
                        />
                        <Bar dataKey="rfqs" name="RFQs Received" stackId="a" fill="#E5E7EB" radius={[0, 0, 4, 4]} />
                        <Bar dataKey="sent" name="Proposals Sent" stackId="a" fill="#FF8A8A" />
                        <Bar dataKey="wins" name="Wins" stackId="a" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default MonthlyPerformance;

'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, FileText } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        return days;
    };

    const getFirstDayOfMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = new Date(year, month, 1).getDay();
        return day;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Mock events for now - eventually hook up to RFQs with deadlines
    const events = [
        { date: 5, title: 'Renovation Proposal Due', type: 'deadline', color: 'bg-red-100 text-red-700' },
        { date: 12, title: 'Site Visit - Smith Residence', type: 'meeting', color: 'bg-blue-100 text-blue-700' },
        { date: 15, title: 'Cabinetry Delivery', type: 'delivery', color: 'bg-green-100 text-green-700' },
        { date: 24, title: 'Project Start - Kitchen', type: 'start', color: 'bg-purple-100 text-purple-700' },
    ];

    const renderCalendarDays = () => {
        const days = [];
        const totalSlots = Math.ceil((daysInMonth + firstDay) / 7) * 7;

        for (let i = 0; i < totalSlots; i++) {
            const dayNumber = i - firstDay + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
            const event = isCurrentMonth ? events.find(e => e.date === dayNumber) : null;

            days.push(
                <div
                    key={i}
                    className={`min-h-[120px] p-2 border border-gray-100 relative ${isCurrentMonth ? 'bg-white' : 'bg-gray-50'}`}
                >
                    {isCurrentMonth && (
                        <>
                            <span className={`text-sm font-medium ${new Date().getDate() === dayNumber &&
                                    new Date().getMonth() === currentDate.getMonth()
                                    ? 'bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center'
                                    : 'text-gray-700'
                                }`}>
                                {dayNumber}
                            </span>

                            {event && (
                                <div className={`mt-2 p-1.5 rounded text-xs font-semibold ${event.color} cursor-pointer hover:opacity-80`}>
                                    {event.title}
                                </div>
                            )}
                        </>
                    )}
                </div>
            );
        }
        return days;
    };

    return (
        <DashboardLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-dark mb-2">Project Schedule</h1>
                    <p className="text-gray-600">Track deadlines, site visits, and project milestones.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold text-dark min-w-[200px] text-center">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h2>
                    <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="grid grid-cols-7 text-center border-b border-gray-200 bg-gray-50">
                    {daysOfWeek.map(day => (
                        <div key={day} className="py-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {renderCalendarDays()}
                </div>
            </Card>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <Clock className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-dark">Upcoming Deadlines</h3>
                    </div>
                    <ul className="space-y-3">
                        <li className="text-sm border-b border-gray-50 pb-2">
                            <div className="font-medium">Renovation Proposal</div>
                            <div className="text-gray-500 text-xs">Due in 2 days</div>
                        </li>
                        <li className="text-sm">
                            <div className="font-medium">Contract Signing</div>
                            <div className="text-gray-500 text-xs">Due Feb 28</div>
                        </li>
                    </ul>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-dark">Site Visits</h3>
                    </div>
                    <ul className="space-y-3">
                        <li className="text-sm border-b border-gray-50 pb-2">
                            <div className="font-medium">Smith Residence</div>
                            <div className="text-gray-500 text-xs text-blue-600">Tomorrow at 10:00 AM</div>
                        </li>
                        <li className="text-sm">
                            <div className="font-medium">Commercial Lot B</div>
                            <div className="text-gray-500 text-xs">Mar 05 at 2:00 PM</div>
                        </li>
                    </ul>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <FileText className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-dark">Project Activity</h3>
                    </div>
                    <div className="text-sm text-gray-500 italic">
                        No recent activity logged this week.
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}

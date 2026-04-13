"use client";

import { Application } from "./columns";
import { format, startOfWeek, eachDayOfInterval } from "date-fns";

interface WeeklyStatsProps {
  applications: Application[];
}

export function WeeklyStats({ applications }: WeeklyStatsProps) {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: today });

  const dailyCount = daysOfWeek.map((day) => {
    const count = applications.filter((app) => {
      const appDate = new Date(app.applied_date);
      return format(appDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
    }).length;
    return {
      day: format(day, "EEE").toUpperCase(),
      date: format(day, "MMM d"),
      count,
    };
  });

  const totalThisWeek = dailyCount.reduce((sum, day) => sum + day.count, 0);
  const averagePerDay = totalThisWeek / daysOfWeek.length;
  const bestDay = [...dailyCount].sort((a, b) => b.count - a.count)[0];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-medium text-gray-600">This week</p>
        <p className="mt-3 text-3xl font-semibold text-gray-900">
          {totalThisWeek}
        </p>
        <p className="mt-2 text-sm text-gray-500">applications</p>
      </div>

      <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-medium text-gray-600">Daily average</p>
        <p className="mt-3 text-3xl font-semibold text-gray-900">
          {averagePerDay.toFixed(1)}
        </p>
        <p className="mt-2 text-sm text-gray-500">per day</p>
      </div>

      <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-medium text-gray-600">Best day</p>
        <p className="mt-3 text-3xl font-semibold text-cyan-700">
          {bestDay?.count || 0}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {bestDay?.day} {bestDay?.date}
        </p>
      </div>

      <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-medium text-gray-600 mb-3">
          Daily breakdown
        </p>
        <div className="space-y-3">
          {dailyCount.map((day) => (
            <div
              key={day.day}
              className="flex items-center justify-between gap-3"
            >
              <div className="min-w-[60px] text-xs font-semibold text-gray-600">
                {day.day}
              </div>
              <div className="flex-1 rounded-full bg-gray-100 p-[3px]">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${
                      Math.max(...dailyCount.map((d) => d.count)) > 0
                        ? (day.count /
                            Math.max(...dailyCount.map((d) => d.count))) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="w-6 text-right text-xs font-semibold text-gray-900">
                {day.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

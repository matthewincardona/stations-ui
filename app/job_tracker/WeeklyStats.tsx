"use client";

import { Application } from "./columns";
import {
  format,
  subDays,
  startOfWeek,
  eachDayOfInterval,
  isWithinInterval,
} from "date-fns";
import { TrendingUp } from "lucide-react";

interface WeeklyStatsProps {
  applications: Application[];
}

export function WeeklyStats({ applications }: WeeklyStatsProps) {
  // Get the start of the current week (Sunday)
  const today = new Date();
  const weekStart = startOfWeek(today);
  const weekEnd = today;

  // Generate array of each day in the week
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  // Count applications per day this week
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total This Week */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-1">This Week</p>
        <p className="text-3xl font-bold text-gray-900">{totalThisWeek}</p>
        <p className="text-xs text-gray-500 mt-2">applications</p>
      </div>

      {/* Average Per Day */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-1">Daily Average</p>
        <p className="text-3xl font-bold text-gray-900">
          {averagePerDay.toFixed(1)}
        </p>
        <p className="text-xs text-gray-500 mt-2">per day</p>
      </div>

      {/* Best Day */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-1">Best Day</p>
        <p className="text-3xl font-bold text-green-600">
          {bestDay?.count || 0}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {bestDay?.day} {bestDay?.date}
        </p>
      </div>

      {/* Daily Breakdown */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <p className="text-sm font-medium text-gray-600 mb-3">
          Daily Breakdown
        </p>
        <div className="space-y-2">
          {dailyCount.map((day) => (
            <div key={day.day} className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">
                {day.day}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-5 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
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
                <span className="text-xs font-semibold text-gray-900 w-6 text-right">
                  {day.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

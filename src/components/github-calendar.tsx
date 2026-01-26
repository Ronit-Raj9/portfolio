import React from 'react'
import { cn, getContributionLevelClass, getCalendarMonths } from '@/lib/utils'

interface Day {
  count: number
  date: string
  weekday: number
}

interface CalendarWeek {
  days: Day[]
}

interface Month {
  name: string
  position: number
}

interface GitHubCalendarProps {
  data: {
    weeks: CalendarWeek[]
    totalContributions: number
  }
}

export function GitHubCalendar({ data }: GitHubCalendarProps) {
  // Flatten days from weeks to use for month calculations
  const allDays = data.weeks.flatMap(week => week.days).filter(day => day.date)
  
  // Get month labels and positions
  const months = getCalendarMonths(allDays)
  
  return (
    <div className="w-full">
      {/* Month labels */}
      <div className="flex text-xs text-muted-foreground mb-1">
        <div className="w-6" /> {/* Offset for day labels */}
        <div className="flex-1 flex">
          {months.map((month: Month, i: number) => (
            <div 
              key={i} 
              className="flex-1 text-center"
              style={{
                position: 'relative',
                left: i === 0 ? '0' : `-${months[i-1]?.name.length * 3}px`
              }}
            >
              {month.name}
            </div>
          ))}
        </div>
      </div>
      
      {/* Calendar grid */}
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col justify-between pr-1 text-xs text-muted-foreground">
          <span className="h-[10px]"></span>
          <span>Mon</span>
          <span className="h-[10px]"></span>
          <span>Wed</span>
          <span className="h-[10px]"></span>
          <span>Fri</span>
          <span className="h-[10px]"></span>
        </div>
        
        {/* Calendar cells */}
        <div className="flex-1 gap-1">
          <div className="grid grid-flow-col gap-[3px]">
            {data.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                {week.days.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={cn(
                      "w-[10px] h-[10px] rounded-sm",
                      day.date ? getContributionLevelClass(day.count) : "bg-transparent"
                    )}
                    title={day.date ? `${day.count} contributions on ${day.date}` : ""}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-end mt-2 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-[3px] mx-2">
          <div className={cn("w-[10px] h-[10px] rounded-sm", getContributionLevelClass(0))} />
          <div className={cn("w-[10px] h-[10px] rounded-sm", getContributionLevelClass(1))} />
          <div className={cn("w-[10px] h-[10px] rounded-sm", getContributionLevelClass(4))} />
          <div className={cn("w-[10px] h-[10px] rounded-sm", getContributionLevelClass(8))} />
          <div className={cn("w-[10px] h-[10px] rounded-sm", getContributionLevelClass(12))} />
        </div>
        <span>More</span>
      </div>
    </div>
  )
} 
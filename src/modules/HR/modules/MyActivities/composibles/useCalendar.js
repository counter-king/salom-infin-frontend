import { MONTH_NAMES } from "@/enums"
import { ref } from "vue"

export const useCalendar = () => {

const currentDate = ref(new Date())
// Get current year and month 
// return 2025
const currentYear = currentDate.value.getFullYear()
// return 1 or 2
const currentMonth = currentDate.value.getMonth()

// Get the first day of the month  // return 14 2025 16:26:14 GMT+0500
const firstDayOfMonth = new Date(currentYear, currentMonth, 1) 

// Get the last day of the month // 31 2025 16:26:14 GMT+0500
const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)

// Get the weekday for the first day of the month (0 - Sunday, 1 - Monday, etc.)
// Convert so that Monday is 0 and Sunday is 6 
// getDay() return 0...6
let firstDayOfWeek = firstDayOfMonth.getDay() - 1
if (firstDayOfWeek === -1) firstDayOfWeek = 6

// Get the number of days in the month
// return 31 or 30
const daysInMonth = lastDayOfMonth.getDate()

// Get the number of days in the previous month 
const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate()

// Create an array of days to display in the calendar
const calendarDays = []

// Add days from the previous month
for (let i = 0; i < firstDayOfWeek; i++) {
    const date = new Date(currentYear, currentMonth - 1, prevMonthLastDay - firstDayOfWeek + i + 1)
    const dayOfWeek = date.getDay()
    calendarDays.push({
    day: prevMonthLastDay - firstDayOfWeek + i + 1,
    currentMonth: false,
    date: new Date(currentYear, currentMonth - 1, prevMonthLastDay - firstDayOfWeek + i + 1),
    workDay: dayOfWeek !== 0 && dayOfWeek !== 6
    })
}

// Add days from the current month
for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i)
    const dayOfWeek = date.getDay();
    
    calendarDays.push({
    day: i,
    currentMonth: true,
    date: new Date(currentYear, currentMonth, i),
    workDay: dayOfWeek !== 0 && dayOfWeek !== 6
    })
}
// Add days from the next month
const remainingDays = 35 - calendarDays.length // 6 rows of 7 days
for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
    day: i,
    currentMonth: false,
    date: new Date(currentYear, currentMonth + 1, i),
    })
}

// Function to go to the previous month
const goToPrevMonth = () => {
    currentDate.value = new Date(currentYear, currentMonth - 1, 1)
}

// Function to go to the next month
const goToNextMonth = () => {
    currentDate.value = new Date(currentYear, currentMonth + 1, 1)
}

// Function to handle month selection
const handleMonthChange = (data) => {
  const month = MONTH_NAMES.find((month) => month.id === data?.month?.id)
  if (month) {
    currentDate.value = new Date(currentYear, month.id - 1, 1)
  }
}

return {
        goToPrevMonth,
        goToNextMonth,
        handleMonthChange,
        currentDate,
        currentMonth
        calendarDays
    }
}

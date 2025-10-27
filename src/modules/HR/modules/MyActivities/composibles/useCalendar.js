import { MONTH_NAMES } from "@/enums"
import { ref, watch, computed  } from "vue"

export const useCalendar = () => {

const today = new Date()
const currentMonthFirstDate = ref(new Date(today.getFullYear(), today.getMonth() - 1, 1))
// Get current year and month 
// return 2025
const currentYear = computed(() => currentMonthFirstDate.value.getFullYear())
// return 1 or 2
const currentMonth = computed(() => currentMonthFirstDate.value.getMonth())

// Get the first day of the month  // return 14 2025 16:26:14 GMT+0500
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1)) 

// Get the last day of the month // 31 2025 16:26:14 GMT+0500
const lastDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0))

// Get the weekday for the first day of the month (0 - Sunday, 1 - Monday, etc.)
// Convert so that Monday is 0 and Sunday is 6 
// getDay() return 0...6
const firstDayOfWeek = computed(() => firstDayOfMonth.value.getDay() - 1)

watch(()=>firstDayOfWeek.value, () => {
    if (firstDayOfWeek.value === -1) firstDayOfWeek.value = 6
},{ immediate: true })

// Get the number of days in the month
// return 31 or 30
const daysInMonth = computed(() => lastDayOfMonth.value.getDate())

// Get the number of days in the previous month 
const prevMonthLastDay = computed(() => new Date(currentYear.value, currentMonth.value, 0).getDate())

// Create an array of days to display in the calendar
const calendarDays = ref([])
watch(()=> currentMonthFirstDate.value, () => {
    calendarDays.value = []
   // Add days from the previous month
    for (let i = 0; i < firstDayOfWeek.value; i++) {
        const date = new Date(currentYear.value, currentMonth.value - 1, prevMonthLastDay.value - firstDayOfWeek.value + i + 1)
        const dayOfWeek = date.getDay()
        calendarDays.value.push({
        // day: prevMonthLastDay.value - firstDayOfWeek.value + i + 1,
        day: null,
        currentMonth: false,
        date: new Date(currentYear.value, currentMonth.value - 1, prevMonthLastDay.value - firstDayOfWeek.value + i + 1),
        // workDay: dayOfWeek !== 0 && dayOfWeek !== 6
        workDay: false,
        })
    }

    // Add days from the current month
    for (let i = 1; i <= daysInMonth.value; i++) {
        const date = new Date(currentYear.value, currentMonth.value, i)
        const dayOfWeek = date.getDay();
        calendarDays.value.push({
            day: i,
            currentMonth: true,
            date: new Date(currentYear.value, currentMonth.value, i),
            workDay: dayOfWeek !== 0 && dayOfWeek !== 6
        })
    }
    // Add days from the next month
    const remainingDays = 35 - calendarDays.value.length // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
        calendarDays.value.push({
        day: "",
        currentMonth: false,
        date: new Date(currentYear.value, currentMonth.value + 1, i),
        workDay: false   
        })
    }

},{ immediate: true })

// Function to go to the previous month
const goToPrevMonth = () => {
    currentMonthFirstDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

// Function to go to the next month
const goToNextMonth = () => {
    currentMonthFirstDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const handleClickCurrentMonth = () => {
    currentMonthFirstDate.value = new Date(today.getFullYear(), today.getMonth(), 1)
}

// Function to handle month selection
const handleMonthChange = (data) => {
  const month = MONTH_NAMES.find((month) => month.id === data?.month?.id)
  if (month) {
    currentMonthFirstDate.value = new Date(data?.year, month.id - 1, 1)
  }
}

return {
        goToPrevMonth,
        goToNextMonth,
        handleMonthChange,
        currentMonthFirstDate,
        currentMonth,
        calendarDays,
        handleClickCurrentMonth
    }
}

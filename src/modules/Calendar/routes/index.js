const Calendar = [
  {
    path: "calendar",
    name: "CalendarIndex",
    meta: {
      isAuthRequired: true
    },
    component: () => import("../views/Home.vue"),
  }
]

export default Calendar

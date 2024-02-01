// Enums
import { CALENDAR_TYPES } from '../enums'

const Calendar = [
  {
    path: "calendar",
    name: "CalendarIndex",
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    component: () => import("../views/index.vue"),
    redirect: {
      name: 'Calendar',
      params: {
        type: CALENDAR_TYPES.MONTHS
      }
    },
    children: [
      {
        path: ':type',
        name: 'Calendar',
        component: () => import('../views/Calendar.vue')
      },
      {
        path: ':type/:y/:m/:d',
        name: 'CalendarDate',
        component: () => import('../views/Calendar.vue')
      },
    ]
  }
]

export default Calendar

import Profile from '../modules/Profile/routes'
import Attendance from '../modules/Attendance/routes'
import BusinessTrip from "@/modules/HR/modules/BusinessTrip/routes"
import Agreements from '../modules/Agreements/routes'
import AgreementSettings from '../modules/AgreementSettings/routes'
import Dashboard from '../modules/Dashboard/routes'
import InteractionABS from '../modules/InteractionABS/routes'
import Survey from '../modules/Survey/routes'
import MyActivities from '../modules/MyActivities/routes'
import TimesheetSystem from '../modules/TimesheetSystem/routes'

const HR = [
  {
    path: 'hr',
    name: 'HRIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: 'BusinessTripIndex' },
    children: [
      // Profile
      ...Profile,
      // Attendance
      ...Attendance,
      // Business Trip
      ...BusinessTrip,
      // Agreements
      ...Agreements,
      // AgreementSettings
      ...AgreementSettings,
      // Dashboard
      ...Dashboard,
      // InteractionABS
      ...InteractionABS,
      // Survey
      ...Survey,
      // MyActivities
      ...MyActivities,
      // TimesheetSystem
      ...TimesheetSystem
    ]
  }
]

export default HR

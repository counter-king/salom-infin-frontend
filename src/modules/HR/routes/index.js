import Profile from '../modules/Profile/routes'
import BusinessTrip from "@/modules/HR/modules/BusinessTrip/routes"
import Agreements from '../modules/Agreements/routes'
import AgreementSettings from '../modules/AgreementSettings/routes'
import Dashboard from '../modules/Dashboard/routes'
import MyActivities from '../modules/MyActivities/routes'

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
      // Business Trip
      ...BusinessTrip,
      // Agreements
      ...Agreements,
      // AgreementSettings
      ...AgreementSettings,
      // Dashboard
      ...Dashboard,
      // MyActivities
      ...MyActivities
    ]
  }
]

export default HR

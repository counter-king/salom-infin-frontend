// Enums
import { JOURNAL } from '@/enums'

const Registration = [
  {
    path: "registration",
    name: "RegistrationIndex",
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    redirect: {
      name: 'RegistrationList',
      params: {
        journal: JOURNAL.INCOMING
      }
    },
    component: () => import("../views/index.vue"),
    children: [
      {
        path: ":journal",
        name: "RegistrationList",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/List.vue"),
      },
      {
        path: ":journal/:id/show",
        name: "RegistrationShow",
        meta: {
          isAuthRequired: true,
          navigation: false
        },
        component: () => import("../views/Show.vue"),
      }
    ]
  }
]

export default Registration

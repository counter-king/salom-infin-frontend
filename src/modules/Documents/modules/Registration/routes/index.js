// Enums
import { JOURNAL, JOURNAL_CODES } from '@/enums'

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
        code: JOURNAL_CODES.INCOMING
      }
    },
    component: () => import("../views/index.vue"),
    children: [
      {
        path: ":code",
        name: "RegistrationList",
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import("../views/List.vue"),
      },
      {
        path: ":code/:id/show",
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

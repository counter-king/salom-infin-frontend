const Profile = [
  {
    path: 'profile',
    name: 'ProfileIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    component: () => import('../views/Profile/index.vue'),
    redirect: { name: 'PersonalIndex' },
    children: [
      // Персональный
      {
        path: 'personal',
        name: 'PersonalIndex',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/Profile/Personal/index.vue')
      },
      // Рабочий
      {
        path: 'work',
        name: 'WorkIndex',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/Profile/Work/index.vue')
      },
      // Моя зарплата
      {
        path: 'salary',
        name: 'SalaryIndex',
        meta: {
          isAuthRequired: true
        },
        component: () => import('../views/Profile/Salary/index.vue')
      }
    ]
  },
]

export default Profile

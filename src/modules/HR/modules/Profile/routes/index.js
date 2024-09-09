const Profile = [
  {
    path: 'profile',
    name: 'ProfileIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    children: [

    ]
  }
]

export default Profile

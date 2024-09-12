
const AgreementSettings = [
  {
    path: 'agreement-settings',
    name: 'AgreementSettingsIndex',
    meta: {
      isAuthRequired: true,
      navigation: true
    },
    component: () => import('../views/index.vue'),
    redirect: { name: 'AgreementCategoty' },
    children: [
      // Category
      {
        path: 'category',
        name: 'AgreementCategoty',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/catgory.vue')
      },
      // /Category

      // Type
      {
        path: 'type',
        name: 'AgreementType',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/type.vue')
      }
      // /Type
    ]
  }
]

export default AgreementSettings

const Survey = [
  {
    path: 'tests-surveys',
    name: 'TestsSurveyIndex',
    meta: {
      isAuthRequired: true
    },
    component: () => import('../views/index.vue'),
    redirect: {
      name: 'TestsIndex'
    },
    children: [
      {
        path: 'tests',
        name: 'TestsIndex',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Tests/index.vue'),
      },
      {
        path: 'test/:id',
        name: 'TestShow',
        meta: {
          isAuthRequired: true,
          // navigation: true,
          // miniSidebar: true
        },
        component: () => import('../views/Tests/show.vue'),
      },
      {
        path: 'test-constructor',
        name: 'TestConstructorIndex',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/TestConstructor/index.vue'),
      },
      {
        path: 'surveys',
        name: 'SurveysIndex',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/Survey/index.vue'),
      },
      {
        path: 'survey-constructor',
        name: 'SurveyConstructorIndex',
        meta: {
          isAuthRequired: true,
          navigation: true
        },
        component: () => import('../views/SurveyConstructor/index.vue'),
      },
    ]
  }
]

export default Survey

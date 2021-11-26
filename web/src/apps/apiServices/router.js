const routes = [
  {
    path: '/apiservices',
    name: 'Apiservices',
    meta: {
      title: '仙翁数据中台',
      publicPage: true
    },
    component: () => import('./view/apiServices/index.vue')
  },
  {
    path: '/servicesMangement',
    name: 'ServicesMangement',
    meta: {
      title: '仙翁数据中台',
      publicPage: true
    },
    component: () => import('./view/servicesMangement/index.vue')
  },
  {
    path: '/servicesExecute',
    name: 'ServicesExecute',
    meta: {
      title: '仙翁数据中台',
      publicPage: true
    },
    component: () => import('./view/servicesExecute/index.vue')
  },
]

export default routes;
export const subAppRoutes = {
  path: '',
  name: 'layout',
  component: () => import('./view/layout.vue'),
  redirect: '/workflow',
  meta: {
    title: '仙翁数据中台',
    publicPage: true, // 权限公开
  },
  children: []
}
export default [
  {
    path: 'workflow',
    name: 'Workflow',
    meta: {
      title: 'My Workflow',
      publicPage: true,
      parent: 'Project',
    },
    component: () =>
      import('./view/workflow/index.vue'),
  },
  {
    path: 'process',
    name: 'Process',
    meta: {
      title: '仙翁数据中台',
      publicPage: true,
    },
    component: () =>
      import('./view/process/index.vue'),
  }
]
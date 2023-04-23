import Layout from '../views/layout/index.vue'
export default [
  {
    path: '/device-management/device-ledger',
    component: Layout,
    children: [
      {
        path: 'add',
        name: 'device-ledger-add',
        meta: {
          title: '新增设备'
        },
        component: () => import('../views/device-management/device-ledger/add.vue')
      },
      {
        path: 'detail',
        name: 'device-ledger-detail',
        meta: {
          title: '设备详情'
        },
        component: () => import('../views/device-management/device-ledger/detail.vue')
      }
    ]


  },
]
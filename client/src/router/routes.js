
const routes = [
  {
    path: '/login',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    meta: { auth: true },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'gallery', component: () => import('pages/GalleryIndex.vue'), props: true, name: 'GalleryIndex' },
      { path: 'gallery/:galleryid', component: () => import('pages/GalleryDetail.vue'), props: true, name: 'GalleryDetail' },
      { path: 'order/:orderid?', component: () => import('pages/Orders.vue'), props: true, name: 'Orders' }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: () => import('@/views/NotesView.vue'),
      meta: { title: 'Notes' },
    },
    {
      path: '/concepts',
      name: 'concepts',
      component: () => import('@/views/ConceptsView.vue'),
      meta: { title: 'Concepts' },
    },
  ],
})

router.afterEach((to) => {
  document.title = `${to.meta.title ?? 'Page'} · Vue Notes`
})

export default router

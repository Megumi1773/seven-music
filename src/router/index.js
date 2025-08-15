import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/discover',
            name: 'discover',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('@/views/SearchView.vue')
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/views/ProfileView.vue')
        },
        {
            path: '/mysonglists',
            name: 'mysonglists',
            component: () => import('@/views/Songlists.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () =>import('@/views/SettingView.vue')
        },
        {
            path: '/playlist/:id',
            name: 'playlist',
            component: () => import('@/views/PlaylistDetail.vue')
        }
    ],
})

export default router

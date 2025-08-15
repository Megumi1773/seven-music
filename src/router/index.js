import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/discover',
        },
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
            component: () => import('@/views/SongListsView.vue')
        },
        {
            path: '/musiclibary',
            name: 'musiclibary',
            component: () => import('@/views/MusicLibView.vue')
        },
        {
            path: '/like',
            name: 'like',
            component: () => import('@/views/LikeSongView.vue')
        },
        {
            path: '/playlist/:id',
            name: 'playlist',
            component: () => import('@/views/PlaylistDetailView.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/SettingView.vue')
        },

    ],
})

export default router

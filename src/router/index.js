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
            path: '/userprofile',
            name: 'userprofile',
            component: () => import('@/views/UserProfileView.vue')
        },
        {
            path: '/artistprofile/:id',
            name: 'artistprofile',
            component: () => import('@/views/ArtistProfile.vue')
        },
        {
            path: '/everyday',
            name: 'everyday',
            component: () => import('@/views/EverDayView.vue')
        },
        {
            path: '/mysonglists',
            name: 'mysonglists',
            component: () => import('@/components/SongListsView.vue')
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
router.beforeEach((to, from, next) => {
    // 如果访问的是 "/discover" 就直接放行
    if (to.name === 'discover') return next()

    // 其余路由要求登录，这里取个 token 做示例
    const token = localStorage.getItem('token')
    if (!token) {
        window.$message.info("请先登录")
        return next({name: 'discover'})
    }
    next()
})
export default router

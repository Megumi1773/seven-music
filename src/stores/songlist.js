import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getPlaylists} from "@/api/songlist.js";

export const useSongListStore = defineStore('songList', () => {
    const isLoggedIn = localStorage.getItem('isLogin')
    // 获取用户歌单
    const songList = ref([])
    const getUserPlaylist = async () => {
        if (isLoggedIn) {
            let res = await getPlaylists()
            if (res.data.code === 200) {
                songList.value = res.data.data || []
            } else {
                songList.value = []
            }
        }
    }


    return {
        songList,
        getUserPlaylist
    }
})
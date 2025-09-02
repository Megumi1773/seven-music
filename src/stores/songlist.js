import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getPlaylists} from "@/api/songlist.js"
import {useUserStore} from "@store/user.js"
import {storeToRefs} from "pinia"

export const useSongListStore = defineStore('songList', () => {
    //  isLogin
    const userStore = useUserStore()
    const {isLogin} = storeToRefs(userStore)
    // 获取用户歌单
    const songList = ref([])
    let likeListId = ref(0)
    const getUserPlaylist = async () => {
        if (isLogin.value) {
            let res = await getPlaylists()
            if (res.data.code === 200) {
                songList.value = res.data.data || []
                likeListId.value = songList.value[0].id
            } else {
                songList.value = []
            }
        }
    }
    return {
        songList,
        getUserPlaylist,
        likeListId
    }
})
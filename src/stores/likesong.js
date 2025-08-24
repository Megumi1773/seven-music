import {defineStore} from 'pinia'
import {getLikeSongIds, toggleLikeSong} from "@/api/songlist.js"
import {set} from "@vueuse/core";

export const useLikeSongStore = defineStore("LikeSong", () => {
    const LikeSongIds = ref(new Set())
    const getData = async () => {
        let res = await getLikeSongIds()
        if (res.data.code === 200) {
            LikeSongIds.value = new Set(res.data.data)
        }
    }
    const toggleLike = async (id) => {
        let liked = LikeSongIds.value.has(id)
        liked ? LikeSongIds.value.delete(id) : LikeSongIds.value.add(id)
        try {
            let res = await toggleLikeSong({songid: id, liked: !liked})
            if (res.data.code === 200) {
                window.$message.success(res.data.message)
            }
        } catch {
            liked ? LikeSongIds.value.add(id) : LikeSongIds.value.delete(id)
        }
    }
    return {
        LikeSongIds, getData, toggleLike,
    }
}, {
    persist: true,
})
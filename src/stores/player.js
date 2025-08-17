import {defineStore} from 'pinia'
import {ref} from 'vue'
import {getSongUrl} from '@/api/songlist.js'


export const usePlayerStore = defineStore('player', () => {
    const currentSong = ref({
        id: '',
        name: '',
        duration: '',
        artist_name: '',
        album_name: '',
        album_cover: '',
        url: '',
    })

    async function play(song) {
        currentSong.value = {...song}
        const {data} = await getSongUrl(currentSong.value.id)
        currentSong.value.url = data.data
    }

    const playlists = ref()

    function addPlaylist(songs) {
        if (Array.isArray(songs)) {
            playlists.value = songs
        } else {
            playlists.value.push(songs)
        }
    }

    function removePlaylist(id) {
        playlists.value = playlists.value.filter(item => item.id !== id)
        window.$message.success("删除成功")
    }

    return {
        currentSong,
        playlists,
        play,
        addPlaylist,
        removePlaylist
    }
}, {
    persist: true,
})

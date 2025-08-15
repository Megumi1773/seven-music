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

    const playlists = ref([])

    function addPlaylist(...songs) {
        playlists.value.push(...songs)

        console.log(playlists.value)
    }

    return {
        currentSong,
        playlists,
        play,
        addPlaylist,
    }
},{
    persist: true,
})

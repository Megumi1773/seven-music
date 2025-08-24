import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import {getSongUrl} from '@/api/songlist.js'


export const usePlayerStore = defineStore('player', () => {
    const currentSong = ref({
        id: '',
        name: '',
        duration: '',
        artist_name: '',
        album_name: '',
        album_cover: '',
        album_id:'',
        url: '',
    })

    async function play(song) {
        currentSong.value = {...song}
        const {data} = await getSongUrl(currentSong.value.id)
        currentSong.value.url = data.data
    }

    const playlists = ref([])

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

    const currentIndex = computed(() => playlists.value.findIndex(item => item.id === currentSong.value.id))

    async function nextSong() {
        if (currentIndex.value === playlists.value.length - 1) await play(playlists.value[0])
        else await play(playlists.value[currentIndex.value + 1])
    }

    async function prevSong() {
        if (currentIndex.value === 0) await play(playlists.value[playlists.value.length - 1])
        else await play(playlists.value[currentIndex.value - 1])
    }

    return {
        currentSong,
        playlists,
        play,
        addPlaylist,
        removePlaylist,
        nextSong,
        prevSong,
    }
}, {
    persist: true,
})

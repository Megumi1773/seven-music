import request from "@/service/request.js"

export const getPlaylists = async () => {
    return await request.get('/playlists/list')
}
export const getPlaylistById = async (id) => {
    return await request.get(`/playlists/info/${id}`)
}
export const getPlayListSongs = async (id) => {
    return await request.get(`/playlists/${id}/songs`)
}

export const getSongUrl = async (id) => {
    return await request.get(`/v1/songs/url/${id}`)
}

export const createNewPlaylist = async (data) => {
    return await request.post(`/playlists/`, data)
}

export const deletePlaylist = async (id) => {
    return await request.delete(`/playlists/${id}`)
}

export const addPlayListSong = async (id, data) => {
    return await request.post(`/playlists/${id}/songs`, data)
}

export const getLikeSongIds = async () => {
    return await request.get('/playlists/likesongids')
}
export const deleteSongInSongList = async (id, songid) => {
    return await request.delete(`/playlists/${id}/songs/${songid}`)
}
export const toggleLikeSong = async (data) => {
    return await request.post(`/playlists/toggle/like`, data)
}
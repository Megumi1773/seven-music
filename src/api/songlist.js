import request from "@/service/request.js"

export const getPlaylists = async () => {
    return await request.get('/playlists')
}
export const getPlaylistById = async (id) => {
    return await request.get(`/playlists/${id}`)
}
export const getPlayListSongs = async (id) => {
    return await request.get(`/playlists/${id}/songs`)
}
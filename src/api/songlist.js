import request from "@/service/request.js"

export const getPlaylists = async () => {
    return await request.get('/playlists')
}
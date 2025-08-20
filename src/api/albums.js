import request from "@/service/request.js"

export const getAlbumById = async (id) => {
    return await request(`/albums/${id}`)
}

export const getAlbumSongs = async (id) => {
    return await request(`/albums/${id}/songs`)
}
import request from "@/service/request.js"

export const getArtistInfo = async (id) => {
    return await request.get(`/artists/${id}`)
}

export const getArtistSongs = async (id, page, pageSize) => {
    return await request.get(`/artists/${id}/songs?page=${page}&limit=${pageSize}`)
}

export const getArtistSongCount = async (id) => {
    return await request.get(`/artists/${id}/count`)
}
import request from "@/service/request.js"

export const SearchAll = async (q) => {
    return await request(`/search/?q=${q}`)
}
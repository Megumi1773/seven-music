import request from "@/service/request.js"

export const getEveryDaySongs = async () => {
    return await request('/everyday/song')
}

export const getYiYan = async () => {
    return await request('https://yiyan.hstc.fun/')
}
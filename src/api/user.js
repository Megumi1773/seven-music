import request from '@/service/request.js'

export const Login = async (data) => {
    return await request.post('/user/login', data)
}

export const getUserInfo = async () => {
    return await request.get('/user/info')
}

export const Logout = async () => {
    return await request.post('/user/logout')
}

export const updateProfile = async (data) => {
    return await request.put('/user/info', data)
}


export const getMailCode = async (data) => {
    return await request.post('/user/getcode', data)
}
export const register = async (data) => {
    return await request.post('/user/register', data)
}
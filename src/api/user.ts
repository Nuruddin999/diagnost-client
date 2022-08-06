import { registeredUser } from '../actions/user';
import { diagnostApi } from './index';
export const loginApi = async (email: string, password: string) => {
    const response = await diagnostApi.post('/login', {
        email, password
    })
    return response.data
}
export const registerApi = async (body: registeredUser) => {
    const response = await diagnostApi.post('/registration', {
        ...body
    })
    return response.data
}
export const checkAuth = async () => {
    const response = await diagnostApi.post('/refresh', { refreshToken: localStorage.getItem('refreshToken') })
    return response.data
}
export const checkHasSuperAdmin = async () => {
    const response = await diagnostApi.get('/superadmn')
    return response.data
}
export const logOut = async () => {
    const response = await diagnostApi.post('/logout', { refreshToken: localStorage.getItem('refreshToken') })
    return response.data
}
export const changeIsDeletedApi = async (email: string) => {
    const response = await diagnostApi.post('/changedel', {
        email
    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
    return response.data
}


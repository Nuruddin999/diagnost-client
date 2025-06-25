import {diagnostApi} from "./index";
import {UserItemRecapType, UsersRecapType} from "../common/types";



export const getUsersRecapApi = async (period: string
): Promise<{users:Array<UsersRecapType>, count:number}> => {
    const response = await diagnostApi.get('/gurec', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {period},
    })
    return response.data
}

export const getUserItemRecapApi = async (period: string, id:string
): Promise<UserItemRecapType> => {
    const response = await diagnostApi.get('/gutrec', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {period, id},
    })
    return response.data
}
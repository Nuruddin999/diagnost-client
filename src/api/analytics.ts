import {diagnostApi} from "./index";
import {UserItemRecapType} from "../common/types";



export const getUsersRecapApi = async (period: string, id:string,  fromD:string,toD:string
): Promise<{users:Array<UserItemRecapType>, count:number}> => {
    const response = await diagnostApi.get('/gurec', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {period, fromD, toD},
    })
    return response.data
}

export const getUserItemRecapApi = async (period: string, id:string, fromD?: string, toD?:string
): Promise<UserItemRecapType> => {
    const response = await diagnostApi.get('/gutrec', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {period, id, fromD,toD,},
    })
    return response.data
}


export const getUserItemRecapApiByPeriod = async (fromD: string, toD:string,id:string
): Promise<UserItemRecapType> => {
    const response = await diagnostApi.get('/gutrecbpr', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {fromD,toD, id},
    })
    return response.data
}
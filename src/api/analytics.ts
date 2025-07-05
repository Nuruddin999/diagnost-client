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


export const calculateDiff=(timeCurrent:number, applId:number)=>{
    const duration = Date.now() - timeCurrent;
    const token = localStorage.getItem('refreshToken');
    const data = JSON.stringify({ duration, id: applId, token: `Bearer ${token}` });
    const blob = new Blob([data], { type: 'application/json;charset=UTF-8' });
    navigator.sendBeacon(`${process.env.REACT_APP_BASIC_URL}/upddur`, blob);
}
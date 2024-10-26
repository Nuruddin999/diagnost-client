import {diagnostApi} from "./index";
import {SmetasResponseType, SmetaUpdate} from "../common/types";

/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @returns
 */
export const getSmetasApi = async (page: number,
                                   limit: number): Promise<SmetasResponseType> => {
    const response = await diagnostApi.get('/smetas', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {page, limit}
    })
    return response.data
}
export const makeSmetaReadyForCoordApi = async (id: string): Promise<{ success: boolean, message?: string }> => {
    const response = await diagnostApi.post('/smetas-mkrd', {
        id
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const updateOneSmetaApi = async (smeta: SmetaUpdate) => {
    const response = await diagnostApi.post('/smetas-upd-f', {
        ...smeta,
    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
    return response.data
}
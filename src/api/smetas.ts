import {diagnostApi} from "./index";
import {SmetasResponseType, SmetaUpdate} from "../common/types";

/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @param {boolean} isOnCheck Есть ли режим выдачи смет отправленных на проверку.
 * @returns
 */
export const getSmetasApi = async (page: number,
                                   limit: number, isOnCheck?: boolean): Promise<SmetasResponseType> => {
    const response = await diagnostApi.get('/smetas', {
        headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        params: {page, limit, isOnCheck}
    })
    return response.data
}
export const makeSmetaReadyForCoordApi = async (id: string): Promise<{ success: boolean, message?: string }> => {
    const response = await diagnostApi.post('/smetas-mkrd', {
        id,
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const updateSmetaStatusApi = async (id: string, status: string): Promise<{
    success: boolean,
    message?: string
}> => {
    const response = await diagnostApi.post('/smetas-mvdir', {
        id,
        status
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const updateOneSmetaApi = async (smeta: SmetaUpdate) => {
    const response = await diagnostApi.post('/smetas-upd-f', {
        ...smeta,
    }, {headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},})
    return response.data
}

export const deleteSmetaItemApi = async (id: string) => {
    const response = await diagnostApi.get(`/smetasdel/${id}`,
        {
            headers: {'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`},
        })
    return response.data
}
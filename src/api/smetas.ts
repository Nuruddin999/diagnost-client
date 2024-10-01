import {diagnostApi} from "./index";
import {SmetasResponseType} from "../common/types";

/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @returns
 */
export const getSmetasApi = async (page: number,
                                        limit: number):Promise<SmetasResponseType> => {
    const response = await diagnostApi.get('/smetas', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
        params: { page,limit }
    })
    return response.data
}
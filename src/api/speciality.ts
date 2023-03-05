
import { diagnostApi } from './index';
export const addSpecialityApi = async (speciality: string) => {
    const response = await diagnostApi.post('/docspec', {
        speciality,
    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` }, })
    return response.data
}
/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @returns
 */
export const getAllSpecApi = async (page: number,
                                        limit: number,
                                       ) => {
    const response = await diagnostApi.get('/docspecs', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
        params: { page, limit }
    })
    return response.data
}
/**
 * Запрос обновления одного заключения.
 * @param {Object} application обновленное заключение.
 */

export const deleteOneSpecialityApi = async (id: string) => {
    const response = await diagnostApi.get(`/docspecs/${id}`,
        {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
        })
    return response.data
}



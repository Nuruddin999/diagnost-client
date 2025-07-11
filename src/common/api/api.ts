import { diagnostApi } from "../../api"

/**
 * Получение одного элемента по id.
 * @param {number} id Id заключения.
 *  @param {string} url Id заключения.
 */
export const getListItemById = async (id: string, url: string) => {
    const response = await diagnostApi.get(`/${url}/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('refreshToken')}` },
    })
    return response.data
}
export const sessionHeartBit = async (url:string, id: number | string, duration:number) => {
    const response = await diagnostApi.post(url, {id, duration}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`,
        },
    })
    return response.data
}
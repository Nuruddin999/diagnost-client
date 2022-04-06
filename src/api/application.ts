import { applicationForAdd } from '../actions/application';
import { diagnostApi } from './index';
export const addApplicationApi = async (application: applicationForAdd) => {
    const response = await diagnostApi.post('/application', {
        ...application
    })
    return response.data
}
/**
 * Получаем список заключений.
 * @param {number} page Страница.
 * @param {number} limit Сколько показывать.
 * @returns
 */
export const getApplicationApi = async (page: number, limit: number) => {
    const response = await diagnostApi.get('/applications', {
        params: { page, limit }
    })
    return response.data
}


import { applicationForAdd } from '../actions/application';
import { applicationInitialState } from '../reducers/applicationItemSlice';
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
/**
 * Получение одного заключения по id.
 * @param {number} id Id заключения.
 */
export const getOneApplicationApi = async (id: string) => {
    const response = await diagnostApi.get(`/applications/${id}`)
    return response.data
}
/**
 * Запрос обновления одного заключения.
 * @param {Object} application обновленное заключение.
 */
export const updateOneApplicationApi = async (application: applicationInitialState) => {
    ('application in api', application)
    const response = await diagnostApi.post('/updappl', {
        ...application
    })
    return response.data
}



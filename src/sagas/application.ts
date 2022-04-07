import { getApplicationApi } from './../api/application';
import { applicationForAdd } from './../actions/application';
import { call, put } from "redux-saga/effects"
import { changeReqStatus } from "../reducers/userSlice"
import { addApplicationApi } from '../api/application';
import { saveApplicationsList } from '../reducers/applicationSlice';
type applicationAddResponse = {
    id: number,
    name: string,
    patientRequest: string,
    fundName: string,
    manager: string,
    creationDate: string,
    execDate: string,
    updatedAt: string,
    createdAt: string
}
type getAllApplicationsResponse = {
    count: number,
    rows: Array<applicationAddResponse>
}
/**
 * Вход в систему.
 * @param login .
 */
// 8sYY7pn6X9lI
export function* addApplication(addApplication: { type: 'application/add', payload: { application: applicationForAdd } }) {
    try {
        //  yield put(changeLoadStatus(true))
        const response: getAllApplicationsResponse = yield call(addApplicationApi, addApplication.payload.application)
        if (response) {
            // localStorage.setItem('dtokenn', accessToken)
            // localStorage.setItem('refreshToken', refreshToken)
            // yield put(saveUser({ ...user, isLoading: false, reqStatus: 'ok' }))
        }
    } catch (e: any) {
        if (e.response) {
            yield put(changeReqStatus(e.response?.data?.message))
        }
        else {
            yield put(changeReqStatus('Неизвестаня ошибка'))
        }
    }
}
/**
 * Сага получения списка заключений.
 * @param addApplication
 */
export function* fetchApplication(getApplication: { type: 'application/get', payload: { page: number, limit: number } }) {
    try {
        //  yield put(changeLoadStatus(true))
        const { page, limit } = getApplication.payload
        const response: getAllApplicationsResponse = yield call(getApplicationApi, page, limit)
        if (response) {
            const { rows, count } = response
            // localStorage.setItem('dtokenn', accessToken)
            // localStorage.setItem('refreshToken', refreshToken)
           yield put(saveApplicationsList({ applications: rows, count }))
        }
    } catch (e: any) {
        if (e.response) {
            yield put(changeReqStatus(e.response?.data?.message))
        }
        else {
            yield put(changeReqStatus('Неизвестаня ошибка'))
        }
    }
}

import { call, put, select } from "redux-saga/effects"
import { checkAuth, loginApi, logOut, registerApi, checkHasSuperAdmin, changeIsDeletedApi } from "../api/user"
import { RootState } from "../app/store"
import { changeLoadStatus, changeReqStatus, saveSuperUser, saveUser } from "../reducers/userSlice"
type loginUserResponse = {
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string,
        phone: string,
        speciality: string,
        role: string,
    }
}
/**
 * Вход в систему.
 * @param login .
 */
// 8sYY7pn6X9lI
export function* loginUser(login: { type: 'user/login', payload: { email: string, password: string } }) {
    try {
        yield put(changeLoadStatus(true))
        const response: loginUserResponse = yield call(loginApi, login.payload.email, login.payload.password)
        const { accessToken, refreshToken, user } = response
        if (response) {
            localStorage.setItem('dtokenn', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            yield put(saveUser({ ...user, isLoading: false, reqStatus: 'ok' }))
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
 * Регистрация нов пользователя.
 * @param body .
 */
export function* registerUser(body: { type: 'user/register', payload: { email: string, password: string, name: string, speciality: string, phone: string, role: string } }) {
    try {
        yield put(changeLoadStatus(true))
        const response: unknown = yield call(registerApi, body.payload)
        if (response) {
            yield put(changeLoadStatus(false))
            yield put(changeReqStatus('ok'))
            const hasSuperUser: boolean = yield select((state: RootState) => state.user.hasSuperUser)
            if(!hasSuperUser) {
                yield put(saveSuperUser(true))
            }
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
 * Проверяем есть ли токен активности у пользователя
 */
export function* checkUserAuth() {
    try {
        yield put(changeLoadStatus(true))
        const { superAdmin } = yield call(checkHasSuperAdmin)
        if (!superAdmin) { yield put(saveSuperUser(false)) }
        const response: loginUserResponse = yield call(checkAuth)
        const { accessToken, refreshToken, user } = response
        if (response) {
            localStorage.setItem('dtokenn', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            yield put(saveUser({ ...user, isLoading: false, reqStatus: 'ok' }))
        }
    } catch (e: any) {
        if (e.response) {
            yield put(changeReqStatus(e.response?.data?.message))
        }
        else {
            yield put(changeReqStatus('Неизвестаня ошибка'))
        }
        yield put(saveUser({ name: 'empty', role: '', phone: '', email: '', speciality: '', isLoading: false, reqStatus: 'ok' }))
    }
}

export function* logoutUser() {
    try {
        yield put(changeLoadStatus(true))
        const response: number = yield call(logOut)
        if (response) {
            localStorage.removeItem('dtokenn')
            localStorage.removeItem('refreshToken')
            yield put(saveUser({ name: 'empty', role: '', phone: '', email: '', speciality: '', isLoading: false, reqStatus: 'ok' }))
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

export function* changeIsDeletedPlace(body: { type: 'user/changeIsDeletedPlaceType', payload: { email: string} }) {
    try {
        yield put(changeLoadStatus(true))
        const response: loginUserResponse = yield call(changeIsDeletedApi, body.payload.email )
        const { user } = response
        if (response) {
            yield put(saveUser({ ...user, isLoading: false, reqStatus: 'ok' }))
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
import { call, put, select } from "redux-saga/effects"
import { getUserByLetter } from "../actions/user"
import { checkAuth, loginApi, logOut, registerApi, checkHasSuperAdmin, changeIsDeletedApi, getAllUsersApi, deleteUserApi, updateRightApi } from "../api/user"
import { RootState } from "../app/store"
import { changeLoadStatus, changeReqStatus, Right, saveRightsInUserItem, saveSuperUser, saveUser, saveUsers, User } from "../reducers/userSlice"

type loginUserResponse = {
  accessToken: string,
  refreshToken: string,
  user: {
    id: string,
    email: string,
    name: string,
    phone: string,
    speciality: string,
    role: string,
    rights: Array<Right>,
    isDeletedPlace: boolean
  }
}
type allUsersResponse = {
  count: number,
  rows: Array<User>
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
      yield put(saveUser({ ...user, isLoading: false, reqStatus: 'ok', isDeletedPlace: false }))
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
    const response: { user: string } = yield call(registerApi, body.payload)
    if (response) {
      yield put(changeLoadStatus(false))
      yield put(changeReqStatus('ok'))
      const hasSuperUser: boolean = yield select((state: RootState) => state.user.hasSuperUser)
      if (!hasSuperUser) {
        yield put(saveSuperUser(true))
      }
      yield put(getUserByLetter(1, 10, '', '', '', ''))
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
    yield put(saveUser({ id: '0', name: 'empty', role: '', phone: '', email: '', speciality: '', rights: [], isLoading: false, reqStatus: 'ok', isDeletedPlace: false }))
  }
}

export function* logoutUser() {
  try {
    yield put(changeLoadStatus(true))
    const response: number = yield call(logOut)
    if (response) {
      localStorage.removeItem('dtokenn')
      localStorage.removeItem('refreshToken')
      yield put(saveUser({ id: '0', email: '', role: '', name: '', isLoading: false, reqStatus: 'ok', rights: [], phone: '', speciality: '', isDeletedPlace: false }))
      yield put(changeLoadStatus(false))
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

export function* changeIsDeletedPlace(body: { type: 'user/changeIsDeletedPlaceType', payload: { email: string } }) {
  try {
    yield put(changeLoadStatus(true))
    const response: loginUserResponse = yield call(changeIsDeletedApi, body.payload.email)
    const { user } = response
    if (response) {
      yield put(saveUser({ ...user, isLoading: false, reqStatus: 'ok', }))
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
 * Сага получения списка пользователей.
 * @param addApplication
 */
export function* fetchUser(getUser: { type: 'user/getByLetter', payload: { page: number, limit: number, email: string, name: string, speciality: string, phone: string } }) {
  try {
    //  yield put(changeLoadStatus(true))
    const { page, limit, email, name, speciality, phone } = getUser.payload
    const response: allUsersResponse = yield call(getAllUsersApi, page, limit, email, name, speciality, phone)
    if (response) {
      const { rows, count } = response

      yield put(saveUsers({ users: rows, count }))
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
 * Сага обновления прав пользователя из списка пользователей.
 * @param addApplication
 */
export function* updateUserRights(updateRight: { type: 'user/updateRights', payload: { entity: string, field: string, value: boolean, userId: string } }) {
  try {
    const { entity, field, value, userId } = updateRight.payload
    const response: allUsersResponse = yield call(updateRightApi, entity, field, value, userId)
    if (response) {
      const rights: Array<Right> = yield select((state: RootState) => state.user.useritem.rights)
      const changedRights = rights.map((entityName) => entity === entityName.entity ? {
        ...entityName,
        [field]: value
      } : entityName)
      yield put(saveRightsInUserItem({ rights: changedRights }))
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
* Удаление  пользователя.
* @param {Object} delUser .
*/
export function* removeUser(delUser: { type: 'user/deleteone', payload: { id: string } }) {

  try {
    const { id } = delUser.payload
    const response: {} = yield call(deleteUserApi, id)
    if (response) {
      yield put(changeReqStatus('success'))
      yield put(getUserByLetter(1, 10, '', '', '', ''))
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
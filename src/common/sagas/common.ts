import { call, put } from "redux-saga/effects"
import { changeReqStatus } from "../../reducers/userSlice"
import { getListItemById } from "../api/api"

/**
 * Получение заключения по Id.
 * @param {Object} getApplication .
 */
 export function* fetchListItem(getApplication: { type: 'listitem/getlistitem', payload: { id: string, itemurl:string, callback: any } }): any {
    try {
      const { id, callback, itemurl } = getApplication.payload
      const response = yield call(getListItemById, id, itemurl)
      if (response) {
          console.log('responser user', {...response})
        yield put(callback({ ...response }))
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


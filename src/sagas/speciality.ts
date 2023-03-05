import { call, put,  all } from "redux-saga/effects"
import { getUserByLetter } from "../actions/user"
import { deleteUserApi, upLoadFileApi } from "../api/user"
import { setFileUploadStatus, setError, setStatus } from "../reducers/ui"
import { changeReqStatus,  saveUserItemSignFileInfo,} from "../reducers/userSlice"
import {addSpecialityApi, getAllSpecApi} from "../api/speciality";
import {getSpecialityAction } from "../actions/speciality"
import {saveSpecialities} from "../reducers/specialitySlice";


export type allSpecialityResponse = {
    count: number,
    rows: Array<{ id:number, name:string }>,
}

/**
 * Регистрация нов пользователя.
 * @param body .
 */
export function* addSpeciality(body: {
    type:  'speciality/add', payload:  {speciality:string}  }) {
    try {
        yield put(setStatus('pending'))
        const response: { speciality : string } = yield call(addSpecialityApi, body.payload.speciality)
        if (response) {
            yield put(getSpecialityAction(1,100))
            yield put(setStatus('success'))
        }
    } catch (e: any) {
        yield put(setError(e.response ? e.response?.data?.message : 'Произошла ошибка, попробуйте позже'))
    }

}


export function* fetchSpeciality(getSpec: { type: 'speciality/get', payload: { page: number, limit: number } }) {
    try {
        yield put(setStatus('pending'))
        const { page, limit } = getSpec.payload
        const response: allSpecialityResponse = yield call(getAllSpecApi, page, limit)
        if (response) {
            const { rows, count } = response
            yield put(setStatus('ok'))
          yield all([put(setStatus('ok')), put(saveSpecialities({ specialities: rows, count }))])
        }
    } catch (e: any) {
        yield all(
            [put(setStatus('no')),
                put(setError('Произошла ошибка, попробуйте позже')),
            ])
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

/*обноаление картинки подписини у пользователя *
* @param {Object} delUser .
*/
export function* updateUserSignFile(updateUserSignFile: { type: 'user/signupdate', payload: { id: string, files: Array<File> } }) {
    try {
        yield put(setFileUploadStatus('pending'))
        const { id, files } = updateUserSignFile.payload
        const response: { urlSignPath: string, signFileName: string } = yield call(upLoadFileApi, files, id, () => { })
        if (response) {
            yield all([put(setFileUploadStatus('success')), put(saveUserItemSignFileInfo({ urlSignPath: response.urlSignPath, signFileName: response.signFileName }))])
        }
    } catch (e: any) {
        yield all([put(setFileUploadStatus('error')), put(setError("Произошла ошибка, попробуйте позже"))])
    }
}

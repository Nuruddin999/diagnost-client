import {getListItemById} from '../common/api/api';
import {
    changeIsDeletedPlace,
    changeManagerApi,
    updateOneApplicationApi
} from '../api/application';
import {getApplication} from '../actions/application';
import {call, put, select} from "redux-saga/effects"
import {
    applicationInitialState,
    saveApplicationItem,
    saveCheckupPlanDeletedPlace,
    successUpdate
} from '../reducers/applicationItemSlice';
import {RootState} from '../app/store';
import {openManagerChangeModal, setCircular, setError, setUserItemStatus} from '../reducers/ui';
import {CheckupPlanItem} from "../common/types";

type applicationAddResponse = {
    id: number,
    patientName: string,
    patientBirthDate: string,
    patientRequest: string,
    patientPromoter: string,
    fundName: string,
    fundRequest: string,
    manager: string,
    managerSpeciality: string,
    managerId: string,
    checkUpPlaceIsDeleted: boolean,
    creationDate: string,
    execDate: string,
    updatedAt: string,
    createdAt: string
}

export type consiliumDoctor = {
    id?: number,
    name: string,
    speciality: string,
}

type applicationItemFields = {
    ConsiliumDoctors: Array<consiliumDoctor>,
    Diagnostics: Array<{
        id?: number,
        diagnosis: string,
    }>,
    mostProblDiagnosis: string,
    secondaryDiagnosis: string,
    anamnesis: string,
    complaint: string,
    patientName: string,
    managerSignUrlPath: string,
    diagnosticData: string,
    patientBirthDate: string,
    CheckupPlans: Array<CheckupPlanItem>
    Comments: Array<{
        title?: string,
        comment: string,
    }>,
}
export type applicationItemResponse = applicationAddResponse & applicationItemFields;

/**
 * Вход в систему.
 * @param login .
 */


/**
 * Получение заключения по Id.
 * @param {Object} getApplication .
 */
export function* fetchOneApplication(getApplication: { type: 'application/getone', payload: { id: string } }) {
    try {
        const {id} = getApplication.payload
        const response: applicationItemResponse = yield call(getListItemById, id, 'applications')
        if (response) {
            yield put(saveApplicationItem({...response}))
        }
    } catch (e: any) {
        if (e.response) {
        } else {
        }
    }
}

/**
 * Обновление  заключения.
 * @param updateApplication
 */
export function* updateOneApplication(updateApplication: { type: 'application/update' }) {

    try {
        const application: applicationInitialState = yield select((state: RootState) => state.applicationItem)
        const consiliumDoctorsFiltered = application.consiliumDoctors.map(doctor => ({
            name: doctor.name,
            speciality: doctor.speciality
        }))
        yield put(setCircular(true))
        const response: applicationItemResponse = yield call(updateOneApplicationApi, {
            ...application,
            consiliumDoctors: consiliumDoctorsFiltered,
            execDate: new Date().toString()
        })
        if (response) {
            yield put(setCircular(false))
            yield put(setUserItemStatus('updated'))
        }
    } catch (e: any) {
        yield put(setCircular(false))
        yield put(setUserItemStatus('no'))
        yield put(setError('Произошла ошибка'))
    }
}

/**
 * Изменение опции удаления места в плане лечения.
 */
export function* changeDeleteOptionInPlan(body: { type: 'application/changedelopt', payload: { id: string } }) {
    try {
        const response: { checkUpPlaceIsDeleted: boolean } = yield call(changeIsDeletedPlace, body.payload.id)
        if (response) {
            yield put(setCircular(false))
            yield put(saveCheckupPlanDeletedPlace(response.checkUpPlaceIsDeleted))
            yield put(successUpdate('success'))
        }
    } catch (e: any) {
        if (e.response) {
            yield put(setCircular(false))
        } else {
            yield put(setCircular(false))
        }
    }
}


/**
 * Изменение ответственного.
 * @param {Object} changeManager .
 */
export function* changeManagerSaga(changeManager: { type: 'application/updatemanager', payload: { applId: number | string, userId: string } }) {

    try {
        yield put(setCircular(true))
        const {applId, userId} = changeManager.payload
        const {id, role} = yield select((state: RootState) => state.user.user)
        const response: {} = yield call(changeManagerApi, applId.toString(), userId)
        if (response) {
            yield put(getApplication(1, 10, '', '', '', '', '', role === 'doctor' ? id : 'all'))
            yield put(setCircular(false))
            yield put(openManagerChangeModal(undefined))
        }

    } catch (e: any) {
        setCircular(false)
    }
}
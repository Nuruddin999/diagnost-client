import { getListItemById } from './../common/api/api';
import { deleteOneApplicationApi, getApplicationApi, updateOneApplicationApi } from './../api/application';
import { applicationForAdd, getApplication } from './../actions/application';
import { call,  put, select, all } from "redux-saga/effects"
import { addApplicationApi } from '../api/application';
import { saveApplicationsList } from '../reducers/applicationSlice';
import { applicationInitialState, saveApplicationItem, successUpdate } from '../reducers/applicationItemSlice';
import { RootState } from '../app/store';
import { setCircular, setError, setStatus } from '../reducers/ui';
type applicationAddResponse = {
  id: number,
  patientName: string,
  patientBirthDate: string,
  patientRequest: string,
  fundName: string,
  fundRequest: string,
  manager: string,
  managerSpeciality: string,
  managerId: string,
  creationDate: string,
  execDate: string,
  updatedAt: string,
  createdAt: string
}
type getAllApplicationsResponse = {
  count: number,
  rows: Array<applicationAddResponse>,
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
  CheckupPlans: Array<{
    id?: number,
    kind?: string,
    place?: string,
    target?: string
  }>
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

export function* addApplication(addApplication: { type: 'application/add', payload: applicationForAdd }) {
  try {
    yield put(setStatus('pending'))
    const response: getAllApplicationsResponse = yield call(addApplicationApi, addApplication.payload)
    if (response) {
      yield put(setStatus('success'))
      yield put(getApplication(1, 10, '', '', '', '', ''))
    }
  } catch (e: any) {
    if (e.response) {
    }
    else {
    }
  }
}
/**
 * Сага получения списка заключений.
 * @param addApplication
 */
export function* fetchApplication(getApplication: { type: 'application/get', payload: { page: number, limit: number, manager: string, patientName: string, patientRequest: string, fundName: string, fundRequest: string } }) {
  try {
    yield put(setStatus('pending'))
    const { page, limit, patientName, patientRequest, fundName, fundRequest, manager } = getApplication.payload
    const response: getAllApplicationsResponse = yield call(getApplicationApi, page, limit, manager, patientName, patientRequest, fundName, fundRequest)
    if (response) {
      const { rows, count } = response
      yield all([put(setStatus('ok')),put(saveApplicationsList({ applications: rows, count }))])
    }
  } catch (e: any) {
    yield all([put(setStatus('no')),put(setError('Произошлав ошибка, повторите попозже'))])
  }
}
/**
 * Получение заключения по Id.
 * @param {Object} getApplication .
 */
export function* fetchOneApplication(getApplication: { type: 'application/getone', payload: { id: string } }) {
  try {
    const { id } = getApplication.payload
    const response: applicationItemResponse = yield call(getListItemById, id, 'applications')
    if (response) {
      yield put(saveApplicationItem({ ...response }))
    }
  } catch (e: any) {
    if (e.response) {
    }
    else {
    }
  }
}
/**
 * Обновление  заключения.
 * @param {Object} getApplication .
 */
export function* updateOneApplication(updateApplication: { type: 'application/update' }) {

  try {
    const application: applicationInitialState = yield select((state: RootState) => state.applicationItem)
    const consiliumDoctorsFiltered = application.consiliumDoctors.map(doctor => ({ name: doctor.name, speciality: doctor.speciality }))
    yield put(setCircular(true))
    const response: applicationItemResponse = yield call(updateOneApplicationApi, { ...application, consiliumDoctors: consiliumDoctorsFiltered, execDate: new Date().toString() })
    if (response) {
      yield put(setCircular(false))
      yield put(successUpdate('success'))
    }
  } catch (e: any) {
    if (e.response) {
      yield put(setCircular(false))
    }
    else {
      yield put(setCircular(false))
    }
  }
}


/**
* Удаление  заключения.
* @param {Object} getApplication .
*/
export function* removeOneApplication(delApplication: { type: 'application/deleteone', payload: { id: string } }) {

  try {
    const { id } = delApplication.payload
    const response: {} = yield call(deleteOneApplicationApi, id)
    if (response) {
      yield put(successUpdate('success'))
      yield put(getApplication(1, 10, '', '', '', '', ''))
    }
  } catch (e: any) {
    if (e.response) {
    }
    else {
    }
  }
}
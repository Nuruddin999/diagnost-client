import { deleteOneApplicationApi, getApplicationApi, getOneApplicationApi, updateOneApplicationApi } from './../api/application';
import { applicationForAdd, getApplication, getOneApplication } from './../actions/application';
import { call, delay, put, select } from "redux-saga/effects"
import { changeReqStatus } from "../reducers/userSlice"
import { addApplicationApi } from '../api/application';
import { saveApplicationsList } from '../reducers/applicationSlice';
import { applicationInitialState, saveApplicationItem, successUpdate } from '../reducers/applicationItemSlice';
import { RootState } from '../app/store';
import { openModal, setStatus } from '../reducers/ui';
type applicationAddResponse = {
  id: number,
  patientName: string,
  patientBirthDate: string,
  patientRequest: string,
  fundName: string,
  fundRequest: string,
  manager: string,
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
      yield put(getApplication(1, 10, '', '', '', '', ''))
      yield delay(2000)
      yield put(setStatus('ok'))
      yield put(openModal(false))
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
export function* fetchApplication(getApplication: { type: 'application/get', payload: { page: number, limit: number, manager: string, patientName: string, patientRequest: string, fundName: string, fundRequest: string } }) {
  try {
    //  yield put(changeLoadStatus(true))
    const { page, limit, patientName, patientRequest, fundName, fundRequest, manager } = getApplication.payload
    const response: getAllApplicationsResponse = yield call(getApplicationApi, page, limit, manager, patientName, patientRequest, fundName, fundRequest)
    if (response) {
      const { rows, count } = response

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
/**
 * Получение заключения по Id.
 * @param {Object} getApplication .
 */
export function* fetchOneApplication(getApplication: { type: 'application/getone', payload: { id: string } }) {
  try {
    //  yield put(changeLoadStatus(true))
    const { id } = getApplication.payload
    const response: applicationItemResponse = yield call(getOneApplicationApi, id,)
    if (response) {
      //  const { rows, count } = response
      // localStorage.setItem('dtokenn', accessToken)
      // localStorage.setItem('refreshToken', refreshToken)
      yield put(saveApplicationItem({ ...response }))
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
 * Обновление  заключения.
 * @param {Object} getApplication .
 */
export function* updateOneApplication(updateApplication: { type: 'application/update' }) {

  try {
    //  yield put(changeLoadStatus(true))
    const application: applicationInitialState = yield select((state: RootState) => state.applicationItem)
    const consiliumDoctorsFiltered = application.consiliumDoctors.map(doctor => ({ name: doctor.name, speciality: doctor.speciality }))
    const response: applicationItemResponse = yield call(updateOneApplicationApi, { ...application, consiliumDoctors: consiliumDoctorsFiltered, execDate: new Date().toLocaleString() })
    if (response) {
      yield put(successUpdate('success'))
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
* Удаление  заключения.
* @param {Object} getApplication .
*/
export function* removeOneApplication(delApplication: { type: 'application/deleteone', payload: { id: string } }) {

  try {
    const { id } = delApplication.payload
    const response: {} = yield call(deleteOneApplicationApi, id)
    if (response) {
      yield put(successUpdate('success'))
      yield put(getApplication(1, 10, '', '' , '', '', ''))
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
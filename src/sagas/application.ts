import { getApplicationApi, getOneApplicationApi, updateOneApplicationApi } from './../api/application';
import { applicationForAdd, updateApplication } from './../actions/application';
import { call, put, select } from "redux-saga/effects"
import { changeReqStatus } from "../reducers/userSlice"
import { addApplicationApi } from '../api/application';
import { saveApplicationsList } from '../reducers/applicationSlice';
import { applicationInitialState, saveApplicationItem, successUpdate } from '../reducers/applicationItemSlice';
import { RootState } from '../app/store';
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
  Comments:  Array<{
    title?: string,
    comment: string,
  }>,
}
export type applicationItemResponse = applicationAddResponse & applicationItemFields;
/**
 * Вход в систему.
 * @param login .
 */
// 8sYY7pn6X9lI
export function* addApplication(addApplication: { type: 'application/add', payload: applicationForAdd }) {
  try {
    //  yield put(changeLoadStatus(true))
    const response: getAllApplicationsResponse = yield call(addApplicationApi, addApplication.payload)
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
    const response: applicationItemResponse = yield call(updateOneApplicationApi, { ...application, consiliumDoctors: consiliumDoctorsFiltered })
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


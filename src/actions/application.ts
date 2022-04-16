import { createAction } from "@reduxjs/toolkit";
import { applicationInitialState } from "../reducers/applicationItemSlice";
export const Types = {
    applicationAdd: 'application/add',
    applicationGet: 'application/get',
    applicationGetOne: 'application/getone',
    applicationUpdate: 'application/update'
}
export type applicationForAdd = {
    id?: number,
    name: string,
    patientRequest: string,
    fundName: string,
    manager: string,
    creationDate: string,
    execDate: string
}

export const addApplication = createAction(Types.applicationAdd, function prepare(application: applicationForAdd) {
    return {
        payload: {
            ...application
        },
    }
})
export const getApplication = createAction(Types.applicationGet, function prepare(page: number, limit: number) {
    return {
        payload: {
            page, limit
        },
    }
})
export const getOneApplication = createAction(Types.applicationGetOne, function prepare(id: string) {
    return {
        payload: {
            id
        },
    }
})
/**
 * экш обновления заключения
 */
export const updateApplication = createAction(Types.applicationUpdate)


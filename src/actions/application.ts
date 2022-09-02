import { createAction } from "@reduxjs/toolkit";
export const Types = {
    applicationAdd: 'application/add',
    applicationGet: 'application/get',
    applicationGetOne: 'application/getone',
    applicationUpdate: 'application/update',
    applicationDel: 'application/deleteone',
}
export type applicationForAdd = {
    id?: number,
    patientName: string,
    patientBirthDate: string,
    patientRequest: string,
    fundName: string,
    fundRequest: string,
    manager: string,
    managerSpeciality:string,
    managerId:string,
    creationDate: string,
    execDate: string,
}

export const addApplication = createAction(Types.applicationAdd, function prepare(application: applicationForAdd) {
    return {
        payload: {
            ...application
        },
    }
})
export const getApplication = createAction(Types.applicationGet, function prepare(page: number,
    limit: number,
    manager: string,
    patientName: string,
    patientRequest: string,
    fundName: string,
    fundRequest: string) {
    return {
        payload: {
            page, limit, manager, patientName, patientRequest, fundName, fundRequest
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

export const deleteOneApplication = createAction(Types.applicationDel, function prepare(id: string) {
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


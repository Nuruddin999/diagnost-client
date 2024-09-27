import {createAction} from "@reduxjs/toolkit";

export const Types = {
    applicationAdd: 'application/add',
    applicationGet: 'application/get',
    applicationGetOne: 'application/getone',
    applicationUpdate: 'application/update',
    applicationDel: 'application/deleteone',
    applicationChangeDeleteOption: 'application/changedelopt',
    updateManager: 'application/updatemanager'
}
export type applicationForAdd = {
    id?: number,
    creator?: string,
    patientName: string,
    patientBirthDate: string,
    patientRequest: string,
    patientPromoter: string,
    fundName: string,
    fundRequest: string,
    manager: string,
    managerSpeciality: string,
    managerId: string,
    creationDate: string,
    execDate: string,
}

export const getApplication = createAction(Types.applicationGet, function prepare(page: number,
                                                                                  limit: number,
                                                                                  manager: string,
                                                                                  patientName: string,
                                                                                  patientRequest: string,
                                                                                  fundName: string,
                                                                                  fundRequest: string,
                                                                                  creator: string) {
    return {
        payload: {
            page, limit, manager, patientName, patientRequest, fundName, fundRequest, creator
        },
    }
})
export const changeDeleteOptionAction = createAction(Types.applicationChangeDeleteOption, function prepare(id: string) {
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

export const updateManagerAction = createAction(Types.updateManager, function prepare(applId: number | string, userId: number | string) {
    return {
        payload: {
            applId,
            userId
        }
    }
})
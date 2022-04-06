import { createAction } from "@reduxjs/toolkit";
export const Types = {
    applicationAdd: 'application/add',
    applicationGet:'application/get'
}
export type applicationForAdd = {
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


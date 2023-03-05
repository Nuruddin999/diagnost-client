import { createAction } from "@reduxjs/toolkit";
export const Types = {
    specialityAdd: 'speciality/add',
    specialityGet: 'speciality/get',
    specialityDel: 'speciality/deleteone',
}
export type specialityForAdd = {

}

export const addSpecialityAction = createAction(Types.specialityAdd, function prepare(speciality: string) {
    return {
        payload: {
           speciality
        },
    }
})
export const getSpecialityAction = createAction(Types.specialityGet, function prepare(page: number,
                                                                                  limit: number,
                                                                                  ) {
    return {
        payload: {
            page, limit
        },
    }
})

export const deleteOneSpecialityAction = createAction(Types.specialityDel, function prepare(id: string) {
    return {
        payload: {
            id
        },
    }
})


